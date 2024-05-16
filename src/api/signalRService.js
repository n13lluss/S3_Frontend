import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5013/blogHub") // Adjust the URL to your backend hub endpoint
      .configureLogging(LogLevel.Information)
      .build();
  }

  start() {
    this.connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  }

  onReceiveBlogUpdate(callback) {
    this.connection.on("ReceiveBlogUpdate", callback);
  }

  offReceiveBlogUpdate() {
    this.connection.off("ReceiveBlogUpdate");
  }

  stop() {
    this.connection.stop()
      .then(() => console.log('SignalR Disconnected'))
      .catch(err => console.error('SignalR Disconnection Error: ', err));
  }
}

const signalRService = new SignalRService();
export default signalRService;
