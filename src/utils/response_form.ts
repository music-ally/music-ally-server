const form = {
    success: (message: string, data?: any) => {
      return {
        success: true,
        message,
        data
      };
    },
    fail: (message: string, error?: any) => {
      return {
        success: false,
        message,
        error
      };
    }
  };
  
  export default form;