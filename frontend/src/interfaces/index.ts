export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'player';
}

export interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  court: string;
}

export interface Player {
  id: number;
  name: string;
}
