export const GAMES = {
   POST: '/api/postGame',
   DELETE: (id: string) => `/api/deleteGame/${id}`,
};

export const BALLS = {
   POST: '/api/postBall',
   DELETE: (id: string) => `/api/deleteBall/${id}`,
};
