export enum PredictionStatus {
  CHAMPION = 2,
  FIXTURE = 3,
  EXTRATIME = 4,
  PENALTY = 5
}

export enum ScoreStatus {
  PENDING = 1,
  WIN = 2,
  LOSE = 3
}

export enum StatusMatch {
  Finish = 'FT',
  Starts = 'NS'
}

export const TypeTournaments = {
  GROUP: [1, 2, 3],
  kNOCKOUT: 4,
  QUARTERFINALS: 5,
  SEMIFINAL: 6
}

export const fixtureStatus = {
  SCHEDULED: ['TBD', 'NS'], // Lên kế hoạch, sắp diễn ra
  IN_PLAY: ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'], // Đang diễn ra
  FINISHED: ['FT', 'AET', 'PEN'], // Đã kết thúc
  POSTPONED: ['PST'], // Hoãn lại
  CANCELLED: ['CANC'], // Đã huỷ
  ABANDONED: ['ABD'], // Bị huỷ, có thể được rời lại sang ngày khác
  NOT_PLAYED: ['AWD', 'WO'] // Chưa chơi hoặc chiến thắng do 1 đội vắng mặt
}
