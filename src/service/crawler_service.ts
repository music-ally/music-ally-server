import * as playdb_crawler from '../crawler/playdb_crawler';

const get_musicals = async () => {
  try {
    const musicals = await playdb_crawler.fetch_all_musicals();
    // 추가적인 로직 (예: 데이터베이스에 저장) 구현 가능
    return musicals;
  } catch (error) {
    console.error('Error in getMusicals service:', error);
    throw error;
  }
};

export { get_musicals };
