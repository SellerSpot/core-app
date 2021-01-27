import { CONFIG } from 'config/config';
import { SOCKET_EVENTS } from 'config/socketEvents';
import { io, Socket } from 'socket.io-client';
import { updateHeartBeatStatus } from 'store/models/heartBeat';
import { store } from 'store/store';
import { IResponse } from 'typings/response.types';
export class SocketService {
    private onlinServerSocket: Socket;
    constructor() {
        this.onlinServerSocket = null;
    }

    // connection utils - initialize/re-establish and more related to connectivity
    public initiateService = async (token?: string): Promise<void> => {
        /**
         * 1. token will be provided by initiators set auth token if available
         * 2. if not wait for the user to authenticate once user authenticated call from that particular action block and update the socket creds
         * 3. don't forget to close the socket connection and recreate the socket connection while setting auth token on the flow
         * 4. make sure that only auth routes are  unprotected
         */
        if (this.onlinServerSocket !== null) {
            const listeners = this.onlinServerSocket.listenersAny();
            if (listeners.length) {
                this.onlinServerSocket.offAny();
            }
            if (this.onlinServerSocket.connected)
                if (listeners) this.onlinServerSocket.disconnect();
        }

        this.onlinServerSocket = io(CONFIG.ONLINE_SERVER_SOCKET_URL, {
            auth: {
                token,
            },
        });

        this.addHearBeatListener();
    };

    /**
     * adds listener for the active status of the users connection - predicts from user's ping to the socket server
     * should be used in future to decide where the fetch should occur, either in onlineServerSocket/offlineServerSocket
     */
    private addHearBeatListener = async (): Promise<void> => {
        this.onlinServerSocket.on(SOCKET_EVENTS.NATIVE_CONNECT, () => {
            store.dispatch(updateHeartBeatStatus({ onlineServerStatus: true }));
        });
        this.onlinServerSocket.on(SOCKET_EVENTS.NATIVE_DISCONNECT, () => {
            store.dispatch(updateHeartBeatStatus({ onlineServerStatus: false }));
        });
    };

    /**
     * hence socket.io has no in-built timeout handler for callback response delay, we are writing one.
     */

    private withTimeout = (
        onSuccess: (response: IResponse) => void,
        onTimeout: (timeoutResponse: IResponse) => void,
        timeout: number,
    ) => {
        let called = false;

        const timer = setTimeout(() => {
            if (called) return;
            called = true;
            onTimeout({
                status: false,
                statusCode: 408,
                data: [
                    {
                        name: 'timeout',
                        message:
                            'Please try again after sometime or check your internet connection / reload the site.',
                    },
                ],
            });
        }, timeout);

        return (...args: unknown[]) => {
            if (called) return;
            called = true;
            clearTimeout(timer);
            onSuccess.apply(this, args);
        };
    };

    // all operations goes under here
    /**
     *
     * @param eventName type of event, which is the keyof typeof socket_event config file
     * @param data is the body of the request
     * @param volatile @optional defaults to false => it tells the socket service to treat the current request as volativel event that when anomaly happends on connectivity this event will not be added to the buffer to deliver to the server on successfull reconnection
     * no need to attach token on body of the requrest, will be attached globaly with the service itself.
     */
    public async request(
        eventName: keyof typeof SOCKET_EVENTS,
        data?: unknown,
        volatile = false,
    ): Promise<IResponse> {
        const socket = !volatile ? this.onlinServerSocket : this.onlinServerSocket.volatile;
        try {
            const response: IResponse = await new Promise((resolve, reject) => {
                socket.emit(
                    SOCKET_EVENTS[eventName],
                    data,
                    this.withTimeout(
                        (socketResponse) => {
                            // on success
                            if (socketResponse.status === true) {
                                resolve(socketResponse);
                            } else {
                                reject(socketResponse);
                            }
                        },
                        (timeoutResponse) => {
                            // on timeout
                            reject(timeoutResponse);
                        },
                        2000, // 2 seconds timout, wait for response => after that it will through promise reject with 408 status code.
                    ),
                );
            });
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // will be usedLater later
    public setAsyncEvent = (): void => {
        // useful for setting global notification listener
        console.info('setting a async event');
    };

    public removeAsyncEvent = (): void => {
        console.info('removing a async event');
    };

    public removeAllAsyncEvents = (): void => {
        console.info('removing a async event');
    };
}
