class WebSocketClient {
    constructor(url) {
        this.url = url;  //用于指定 WebSocket 的连接地址
        this.socket = null;  //用于存储 WebSocket 实例
        this.isConnected = false;  //用于标识 WebSocket 是否已连接
        this.onMessageCallback = null;  //用于存储消息回调函数。
    }

    connect() {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
            this.socket = new WebSocket(this.url, [token]);
            console.log(this.socket)
            this.socket.onopen = () => {
                console.log('WebSocket 连接成功');
                this.isConnected = true;
                resolve();
            };

            this.socket.onmessage = (event) => {
                if (this.onMessageCallback) {
                    this.onMessageCallback(event.data);
                }
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket 错误:', error);
                reject(error);
            };

            this.socket.onclose = (event) => {
                console.log("连接关闭原因:", event.code, event.reason);
                if (event.code === 1002) {
                  console.error("协议错误");
                } else if (event.code === 1008) {
                  console.error("权限错误");
                }
              };
        });
    }

    //发送消息
    sendMessage(message) {
        if (this.isConnected) {
            this.socket.send(message);
            return true
        } else {
            console.error('WebSocket 连接未建立');
            return false
        }
    }

    //接收消息回调函数
    onMessage(callback) {
        this.onMessageCallback = callback;
    }

    //关闭消息
    close() {
        if (this.isConnected) {
            this.socket.close();
        } else {
            console.error('WebSocket 连接未建立');
        }
    }
}

export default WebSocketClient;
