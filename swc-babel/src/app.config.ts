import type { AppConfig } from '@tarojs/taro';

export default {
  pages: [
    'pages/vmall-list/index',
    'pages/product-detail/index',
    'pages/my-order/index',
    'pages/rights-detail/index',
    'pages/rights-list/index',
    'pages/error/index',
    'pages/third-transfer/index',
    'pages/integral-detail/index',
    'pages/pay-result/index',
    'pages/exchange-address/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  animation: false,
} as AppConfig;
