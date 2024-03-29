import { State } from '@hookstate/core';
import { ICategoryViewProps } from 'components/Compounds/CategoryView/CategoryView.types';
import { ICategorySliderModalProps } from 'components/Compounds/SliderModals/CategorySliderModal/CategorySliderModal.types';
import { uniq } from 'lodash';
import { find, getNodeAtPath, removeNodeAtPath, TreeItem } from 'react-sortable-tree';
import { requests } from 'requests/requests';
import { getNodeKey, rawClone } from 'utilities/general';
import { IConfirmDialogStateActions } from '../ConfirmDialog/ConfirmDialog.types';

interface ISortableTreeNodeTracker {
    previousParent: TreeItem;
    nextParent: TreeItem;
}

interface IEditChildrenOrderProps {
    parentId: string;
    childrenOrder: string[];
}

interface IEditCategoryPositionProps {
    categoryId: string;
    oldParentId: string;
    newParentId: string;
}

interface IDeleteCategoryProps {
    categoryId: string;
}

interface ICategoryViewHandlersServiceProps {
    treeDataState: State<TreeItem[]>;
    sliderModalState: State<
        Pick<ICategorySliderModalProps, 'showModal' | 'prefillData' | 'mode' | 'contextData'>
    >;
    /**
     * Pass the hook function for invoking the confirm dialog box
     */
    confirmDialogHook: IConfirmDialogStateActions;
}

export class CategoryViewHandlersService {
    private treeDataState: ICategoryViewHandlersServiceProps['treeDataState'];
    private sortableTreeNodeTracker: ISortableTreeNodeTracker;
    private sliderModalState: ICategoryViewHandlersServiceProps['sliderModalState'];
    private confirmDialogHook: ICategoryViewHandlersServiceProps['confirmDialogHook'];

    constructor(props: ICategoryViewHandlersServiceProps) {
        const { treeDataState, confirmDialogHook, sliderModalState } = props;
        this.treeDataState = treeDataState;
        this.sliderModalState = sliderModalState;
        this.confirmDialogHook = confirmDialogHook;
        this.sortableTreeNodeTracker = {
            nextParent: null,
            previousParent: null,
        };
    }

    // requests
    private editChildrenOrder = async (props: IEditChildrenOrderProps): Promise<void> => {
        await requests.catalogue.categoryRequest.editChildrenOrder(props);
    };
    private editCategoryPosition = async (props: IEditCategoryPositionProps): Promise<void> => {
        await requests.catalogue.categoryRequest.editCategoryPosition(props);
    };
    private deleteCategory = async (props: IDeleteCategoryProps): Promise<void> => {
        await requests.catalogue.categoryRequest.deleteCategory(props);
    };

    // used to invoke the category slider modal to create category
    createCategoryHandler: ICategoryViewProps['createCategoryCallback'] = (currentNode) => {
        this.sliderModalState &&
            this.sliderModalState.set({
                showModal: true,
                mode: 'create',
                prefillData: null,
                contextData: {
                    currentNode,
                },
            });
    };

    // used to invoke the onChanged to reflect drag changes for the tree
    onChangeHandler: ICategoryViewProps['onChangeCallback'] = (treeData) => {
        this.treeDataState && this.treeDataState.set(treeData);
    };

    // used to decide if a node can be dropped in a location
    canDropHandler: ICategoryViewProps['canDrop'] = (props) => {
        // props
        const { node, nextParent, prevParent } = props;

        // setting the movement tracker
        this.sortableTreeNodeTracker.previousParent = prevParent;
        this.sortableTreeNodeTracker.nextParent = nextParent;

        // variables
        const nextSiblings = nextParent?.children as TreeItem[];

        // compute
        if (!!nextSiblings) {
            const doesHaveSiblingWithSameName = nextSiblings.some(
                (sibling) => sibling.id !== node.id && sibling.title === node.title,
            );
            if (doesHaveSiblingWithSameName) {
                return false;
            }
        }
        return true;
    };

    // used to handle deletion of
    deleteCategoryHandler: ICategoryViewProps['deleteCategoryCallback'] = async (props) => {
        // props
        const { id, title } = props;
        const treeData = rawClone<TreeItem[]>(this.treeDataState && this.treeDataState.get());

        // getting confirmation
        const confirmResult = await this.confirmDialogHook.confirm({
            title: 'Are you sure?',
            theme: 'warning',
            content: `This will permanentaly delete category "${title}"`,
            primaryButtonProps: {
                label: 'DELETE',
                theme: 'danger',
            },
            secondaryButtonProps: {
                label: 'CANCEL',
                theme: 'primary',
            },
        });
        if (confirmResult) {
            this.confirmDialogHook.setLoading({ isLoading: true });
            await this.deleteCategory({
                categoryId: id,
            });
            // finding the node to remove (to get the path)
            const { path } = find({
                getNodeKey,
                treeData,
                searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
                searchQuery: id,
            }).matches[0];
            // updating tree state
            this.treeDataState &&
                this.treeDataState.set(
                    removeNodeAtPath({
                        getNodeKey,
                        path,
                        treeData,
                        ignoreCollapsed: false,
                    }),
                );
            this.confirmDialogHook.setLoading({ isLoading: false });
        }
        this.confirmDialogHook.closeDialog();
    };

    // used when the edit button is clicked on the node
    editCategoryHandler: ICategoryViewProps['editCategoryCallback'] = (currentNode) => {
        // props
        const { id } = currentNode;
        const treeData = rawClone<TreeItem[]>(this.treeDataState && this.treeDataState.get());

        // finding the parent node (to find siblings when editing)
        // getting path of current node
        const requiredNodePath = find({
            getNodeKey,
            searchMethod: (searchData) => searchData.node.id === searchData.searchQuery,
            treeData,
            searchQuery: id,
        }).matches[0].path;
        // altering path
        requiredNodePath.pop();
        // getting parent node using modified path
        const parentNode = getNodeAtPath({
            getNodeKey,
            path: requiredNodePath,
            treeData,
            ignoreCollapsed: false,
        }).node;

        // setting state
        this.sliderModalState &&
            this.sliderModalState.set({
                showModal: true,
                mode: 'edit',
                prefillData: {
                    name: currentNode.title as string,
                },
                contextData: {
                    currentNode,
                    parentNode: parentNode,
                },
            });
    };

    // called everytime a node is in motion when dragging
    onMoveNodeHandler: ICategoryViewProps['onMoveNode'] = (props) => {
        // props
        const { node } = props;
        const nextParentId = this.sortableTreeNodeTracker.nextParent?.id ?? null;
        const previousParentId = this.sortableTreeNodeTracker.previousParent?.id ?? null;
        // deciding the type of movement
        if (nextParentId === previousParentId) {
            // making sure it is not a top level
            if (!!nextParentId) {
                // getting children order
                const childrenOrder: string[] = (
                    this.sortableTreeNodeTracker.nextParent.children as TreeItem[]
                ).map((child) => child.id);
                // updating server
                this.editChildrenOrder({
                    // using uniq since the current node is
                    // being entered twice in the list by the lib
                    childrenOrder: uniq(childrenOrder),
                    parentId: nextParentId,
                });
            }
        } else {
            this.editCategoryPosition({
                categoryId: node.id,
                newParentId: nextParentId,
                oldParentId: previousParentId,
            });
        }
    };
}
