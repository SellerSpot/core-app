import { CONFIG } from 'config/config';
import { SOCKET_EVENTS } from 'config/socketEvents';
import { io, Socket } from 'socket.io-client';
import { updateHeartBeatStatus } from 'store/models/heartBeat';
import { store } from 'store/store';
export class SocketService {
    private onlinServerSocket: Socket;
    constructor() {
        this.onlinServerSocket = null;
    }

    public initiateService = async (): Promise<void> => {
        /**
         * 1. check localstorage and set auth token if available
         * 2. if not wait for the user to authenticate once user authenticated call from that particular action block and update the socket creds
         * 3. don't forget to close the socket connection and recreate the socket connection while setting auth token on the flow
         * 4. make sure that only auth routes are  unprotected
         */
        this.onlinServerSocket = io(CONFIG.ONLINE_SERVER_SOCKET_URL);
        this.addHearBeatListener();
    };

    /**
     * adds listener for the active status of the users connection - predicts from user's ping to the socket server
     * @remarks
     * should be used in future to decide where the fetch should occur, either in onlineServerSocket/offlineServerSocket
     */
    private addHearBeatListener = async (): Promise<void> => {
        this.onlinServerSocket.on(SOCKET_EVENTS.NATIVE.CONNECT, () => {
            store.dispatch(updateHeartBeatStatus({ onlineServerStatus: true }));
        });
        this.onlinServerSocket.on(SOCKET_EVENTS.NATIVE.DISCONNECT, () => {
            store.dispatch(updateHeartBeatStatus({ onlineServerStatus: false }));
        });
    };

    // all operations goes under here
}
