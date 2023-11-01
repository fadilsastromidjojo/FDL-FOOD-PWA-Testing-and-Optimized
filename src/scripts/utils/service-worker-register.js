import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
    if ('serviceWorker' in navigator) {
      await runtime.register();
      return;
    }
    console.log('Service worker tidak support pada browser anda!');
  };

  export default swRegister;
