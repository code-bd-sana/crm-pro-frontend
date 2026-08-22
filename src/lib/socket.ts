import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      autoConnect: true,
      // You can pass token here if your socket requires auth
      auth: {
        token: useAuthStore.getState().accessToken,
      },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      const userId = useAuthStore.getState().user?.id;
      if (userId) {
        this.emit('joinUserRoom', userId);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string, callback?: (data: any) => void) {
    this.socket?.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }
}

export const socketService = new SocketService();
