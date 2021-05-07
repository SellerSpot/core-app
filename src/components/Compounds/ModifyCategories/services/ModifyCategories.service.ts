import { isEqual } from 'lodash';
import {
    find,
    getNodeAtPath,
    NodeData,
    OnDragPreviousAndNextLocation,
    TreeItem,
} from 'react-sortable-tree';
import * as yup from 'yup';

const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;
export class ModifyCategoriesService {
    static canDropCategory = (props: {
        dropProps: OnDragPreviousAndNextLocation & NodeData;
        treeData: TreeItem[];
    }): boolean => {
        const { dropProps, treeData } = props;
        const { node, nextParent, nextPath } = dropProps;

        return !ModifyCategoriesService.isThereASibilingNodeWithSameTitleDNDCheck({
            nextParent,
            currentNode: node,
            nextPath: nextPath as string[],
            treeData,
        });
    };

    static generalSearchMethod = (props: { node: TreeItem; searchQuery: string }): boolean => {
        const { node, searchQuery } = props;
        return (
            searchQuery && node.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    };

    static sibilingCheckSearchMethod = (props: {
        node: TreeItem;
        searchQuery: string;
    }): boolean => {
        const { node, searchQuery } = props;
        return (
            searchQuery &&
            node.title.toString().toLowerCase().localeCompare(searchQuery.toLowerCase()) === 0
        );
    };

    static isThereASibilingNodeWithSameTitleDNDCheck = (props: {
        currentNode: TreeItem;
        treeData: TreeItem[];
        nextParent: TreeItem;
        nextPath: string[];
    }): boolean => {
        const { nextParent, currentNode, treeData, nextPath } = props;
        const { id: currentNodeId, title: currentNodeTitle } = currentNode;
        // getting all nodes with the same title in tree
        const sameTitleNodes = find({
            treeData,
            searchQuery: `${currentNodeTitle}`,
            getNodeKey,
            searchMethod: ModifyCategoriesService.sibilingCheckSearchMethod,
        });
        // invalidNode flag
        let invalidNodeFlag = false;
        // checking if new element is root
        // if it is, then shortcut the validation process
        if (!nextParent) {
            // iterating to check if any of the matching nodes are als\o at root level
            if (
                sameTitleNodes.matches.find((matchedNode) => {
                    return (
                        matchedNode.path.length === 1 &&
                        !isEqual(matchedNode.path, nextPath) &&
                        matchedNode.node.title == currentNode.title
                    );
                })
            ) {
                // setting flag to indicate duplicate
                invalidNodeFlag = true;
            }
        } else {
            sameTitleNodes.matches.map((matchedNode) => {
                // if the same node is matched
                if (matchedNode.node.id === currentNodeId) {
                    return;
                }
                // if the nodes are in the same depth
                else if (matchedNode.path.length === nextPath.length) {
                    // getting path for the matched node parent
                    const matchedNodeParentPath = matchedNode.path;
                    matchedNodeParentPath.pop();
                    // getting parent of matched node
                    const matchedNodeParent = getNodeAtPath({
                        getNodeKey,
                        path: matchedNodeParentPath,
                        treeData,
                    }).node;
                    // checking if the matched node parent and current node parent are the same
                    if (matchedNodeParent.id === nextParent.id) {
                        invalidNodeFlag = true;
                        // stopping the iteration loop
                        return;
                    }
                }
            });
        }
        return invalidNodeFlag;
    };

    static isThereASibilingNodeWithSameTitle = (props: {
        titleOfCurrentNode: string;
        treeData: TreeItem[];
        pathOfCurrentNode: string[];
    }): boolean => {
        const { pathOfCurrentNode, titleOfCurrentNode, treeData } = props;

        // getting all nodes with the same title in tree
        const sameTitleNodes = find({
            treeData,
            searchQuery: titleOfCurrentNode,
            getNodeKey,
            searchMethod: ModifyCategoriesService.sibilingCheckSearchMethod,
        });
        // invalidNode flag
        let invalidNodeFlag = false;
        // checking if new element is root
        // if it is, then shortcut the validation process
        if (pathOfCurrentNode.length === 1) {
            // iterating to check if any of the matching nodes are also at root level
            if (
                sameTitleNodes.matches.find(
                    (matchedNode) =>
                        matchedNode.path.length === 1 &&
                        !isEqual(matchedNode.path, pathOfCurrentNode),
                )
            ) {
                invalidNodeFlag = true;
            }
        } else {
            sameTitleNodes.matches.map((matchedNode) => {
                // if the same node is matched
                if (isEqual(matchedNode.path, pathOfCurrentNode)) {
                    // stopping the iteration loop
                    return;
                }
                // if the nodes are in the same depth
                else if (matchedNode.path.length === pathOfCurrentNode.length) {
                    const matchedNodeParentIndex = matchedNode.path[matchedNode.path.length - 2];
                    const currentNodeParentIndex = pathOfCurrentNode[pathOfCurrentNode.length - 2];
                    // checking if the parent of both matched and current node as the same
                    if (matchedNodeParentIndex === currentNodeParentIndex) {
                        invalidNodeFlag = true;
                        // stopping the iteration loop
                        return;
                    }
                }
            });
        }
        return invalidNodeFlag;
    };

    static validateCategoryName = (props: {
        title: string;
        treeData: TreeItem[];
        path: string[];
    }): string => {
        const { title, treeData, path } = props;

        // checking for sibling with same name
        if (
            ModifyCategoriesService.isThereASibilingNodeWithSameTitle({
                pathOfCurrentNode: path,
                titleOfCurrentNode: title,
                treeData,
            })
        ) {
            return `Category ${title} already present at this level`;
        }

        const validationSchema = yup.string().required('Category Name is required');
        try {
            validationSchema.validateSync(title);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
        }
        return null;
    };
}
