export enum Weather {
  Default = '--Please choose an option--',
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Default = '--Please choose an option--',
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
