// // export const BASE_URL = 'https://bunchofdeals.com.au/APP_CLONE/index.php/user/Api/';
// export const BASE_URL =
//   'https://bunchofdeals.com.au/APP_CLONE/index.php/api/1.0/';

// export const API_END_POINTS = {
//   signUp: `${BASE_URL}user/signUp`,
//   signin: `${BASE_URL}user/signIn`,

//   //user API's
//   SIGN_UP: `${BASE_URL}signup`,
//   SIGN_IN: `${BASE_URL}signin`,
//   VERIFY_OTP: `${BASE_URL}verifyOTP`,
//   RESEND_OTP: `${BASE_URL}resendOTP`,
//   VERIFY_FACEBOOK: `${BASE_URL}verifyfacebook`,
//   VERIFY_GOOGLE_PLUS: `${BASE_URL}verifygoogleplus`,
//   CHECK_USER_CONNECTION: `${BASE_URL}checkUserConnection`,
//   BLOCK_USER: `${BASE_URL}blockUser`,
//   GET_USERS: `${BASE_URL}getUsers`,
//   UPDATE_ACCOUNT: `${BASE_URL}updateAccount`,
//   INSERT_FCM_ID: `${BASE_URL}insertFcmid`,
//   REFRESH_POSITION: `${BASE_URL}refreshPosition`,
//   // https://bunchofdeals.com.au/APP/index.php/api/1.0/offer/getOffers
//   // https://bunchofdeals.com.au/APP/index.php/1.0/offer/getOffers

//   //store API's
//   GET_STORES: `${BASE_URL}/store/getStores`,
//   GET_COMMENTS: `${BASE_URL}/store/getComments`,
//   UPDATE_STORE: `${BASE_URL}/webservice/updateStore`,
//   STORE_RATE: `${BASE_URL}/store/rate`,
//   SAVE_STORE: `${BASE_URL}/store/saveStore`,
//   REMOVE_STORE: `${BASE_URL}/store/removeStore`,

//   //event API's
//   GET_EVENTS: `${BASE_URL}/event/getEvents`,

//   //category API's
//   GET_CATEGORIES: `${BASE_URL}/category/getCategories`,

//   //uploader API's
//   UPLOAD_IMAGE64: `${BASE_URL}/uploader/uploadImage64`,

//   //setting API's
//   APP_INITIALIZATION: `${BASE_URL}/setting/app_initialization`,

//   //messenger API's
//   LOAD_MESSAGES: `${BASE_URL}/messenger/loadMessages`,
//   LOAD_DISCUSSION: `${BASE_URL}/messenger/loadDiscussion`,
//   MARK_MESSAGES_AS_SEEN: `${BASE_URL}/messenger/markMessagesAsSeen`,
//   MARK_MESSAGES_AS_LOADED: `${BASE_URL}/messenger/markMessagesAsLoaded`,
//   SEND_MESSAGE: `${BASE_URL}/messenger/sendMessage`,

//   //offer API's
//   API_GET_OFFERS: `${BASE_URL}/offer/getOffers`,
//   SAVE_OFFER: `${BASE_URL}/offer/saveOffer`,
//   REMOVE_OFFER: `${BASE_URL}/offer/removeOffer`,

//   //campaign API's
//   MARK_VIEW: `${BASE_URL}/campaign/markView`,
//   MARK_RECEIVE: `${BASE_URL}/campaign/markReceive`,

//   //gallery
//   GET_GALLERY: `${BASE_URL}/gallery/getGallery`,

//   //Notification API's
//   GET_NOTIFICATIONS_NEW: `${BASE_URL}/nshistoric/getNotifications_new`,
//   GET_COUNT: `${BASE_URL}/nshistoric/getCount`,
//   CHANGE_STATUS: `${BASE_URL}/nshistoric/changeStatus`,
//   REMOVE: `${BASE_URL}/nshistoric/remove`,
//   NOTIFICATION_AGREEMENT: `${BASE_URL}/campaign/notification_agreement`,

//   //Orders
//   GET_ORDERS: `${BASE_URL}/nsorder/getOrders`,
//   CREATE_ORDER_AND: `${BASE_URL}/nsorder/createOrderAnd`,
//   CREATE_ORDER_COD: `${BASE_URL}/nsorder/createOrder_cod`,

//   //Modules
//   AVAILABLE_MODULES: `${BASE_URL}/modules_manager/availableModules`,

//   //payment
//   GET_PAYMENTS: `${BASE_URL}/order_payment/getPayments`,
//   GET_PAYMENT_LINK: `${BASE_URL}/order_payment/get_payment_link`,
//   LINK_CALL: `${BASE_URL}/order_payment/link_call`,
// };
export const CLONE_BASE_URL = 'https://bunchofdeals.com.au/APP_CLONE/index.php';
export const BASE_URL = 'https://bunchofdeals.com.au/APP/index.php';

export const API = '/api/';
export const API_VERSION = '/1.0/';

export const API_END_POINTS = {
  //store API's
  API_USER_GET_STORES: CLONE_BASE_URL + API + 'store/getStores',
  API_USER_GET_REVIEWS: CLONE_BASE_URL + API + 'store/getComments',
  API_USER_UPDATE_STORE: CLONE_BASE_URL + API + 'webservice/updateStore',
  API_RATING_STORE: CLONE_BASE_URL + API + 'store/rate',
  API_SAVE_STORE: CLONE_BASE_URL + API + 'store/saveStore',
  API_REMOVE_STORE: CLONE_BASE_URL + API + 'store/removeStore',

  //event API's
  API_USER_GET_EVENTS: CLONE_BASE_URL + API + 'event/getEvents',

  //category API's
  API_USER_GET_CATEGORY: CLONE_BASE_URL + API + 'category/getCategories',

  //uploader API's
  API_USER_UPLOAD64: CLONE_BASE_URL + API + 'uploader/uploadImage64',

  //user API's
  signUp: `${CLONE_BASE_URL}${API}user/signUp`,
  signin: `${CLONE_BASE_URL}${API}user/signIn`,
  API_VERIFY_OTP: CLONE_BASE_URL + API + 'user/verifyOTP',
  API_RESEND_OTP: CLONE_BASE_URL + API + 'user/resendOTP',
  API_FACEBOOK_SIGNUP: CLONE_BASE_URL + API + 'user/verifyfacebook',
  API_GOOGLE_SIGNUP: CLONE_BASE_URL + API + 'user/verifygoogleplus',
  API_USER_CHECK_CONNECTION: CLONE_BASE_URL + API + 'user/checkUserConnection',
  API_BLOCK_USER: CLONE_BASE_URL + API + 'user/blockUser',
  API_GET_USERS: CLONE_BASE_URL + API + 'user/getUsers',
  API_UPDATE_ACCOUNT: CLONE_BASE_URL + API + 'user/updateAccount',
  API_USER_REGISTER_TOKEN: CLONE_BASE_URL + API + 'user/insertFcmid',
  API_REFRESH_POSITION: CLONE_BASE_URL + API + 'user/refreshPosition',
  API_FORGOT_PASSWORD: CLONE_BASE_URL + 'fpassword',
  //setting API's
  API_APP_INIT: CLONE_BASE_URL + API + 'setting/app_initialization',
  //messenger API's
  API_LOAD_MESSAGES: CLONE_BASE_URL + API + 'messenger/loadMessages',
  API_LOAD_DISCUSSION: CLONE_BASE_URL + API + 'messenger/loadDiscussion',
  API_INBOX_MARK_AS_SEEN: CLONE_BASE_URL + API + 'messenger/markMessagesAsSeen',
  API_INBOX_MARK_AS_LOADED:
    CLONE_BASE_URL + API + 'messenger/markMessagesAsLoaded',
  API_SEND_MESSAGE: CLONE_BASE_URL + API + 'messenger/sendMessage',

  //offer API's
  API_GET_OFFERS: CLONE_BASE_URL + API + 'offer/getOffers',
  API_SAVE_OFFER: CLONE_BASE_URL + API + 'offer/saveOffer',
  API_REMOVE_OFFER: CLONE_BASE_URL + API + 'offer/removeOffer',

  //campaign API's
  API_MARK_VIEW: CLONE_BASE_URL + API + 'campaign/markView',
  API_MARK_RECEIVE: CLONE_BASE_URL + API + 'campaign/markReceive',

  //gallery
  API_GET_GALLERY: CLONE_BASE_URL + API + 'gallery/getGallery',
  //Notification API's
  API_NOTIFICATIONS_GET:
    CLONE_BASE_URL + API + 'nshistoric/getNotifications_new',
  API_NOTIFICATIONS_COUNT_GET: CLONE_BASE_URL + API + 'nshistoric/getCount',
  API_NOTIFICATIONS_EDIT_STATUS:
    CLONE_BASE_URL + API + 'nshistoric/changeStatus',
  API_NOTIFICATIONS_REMOVE: CLONE_BASE_URL + API + 'nshistoric/remove',
  API_NOTIFICATIONS_AGREEMENT:
    CLONE_BASE_URL + API + 'campaign/notification_agreement',

  //Orders
  API_ORDERS_GET: CLONE_BASE_URL + API + 'nsorder/getOrders',
  API_ORDERS_CREATE: CLONE_BASE_URL + API + 'nsorder/createOrderAnd',
  API_ORDERS_CREATE_COD: CLONE_BASE_URL + API + 'nsorder/createOrder_cod',
  API_AVAILABLE_MODULES:
    CLONE_BASE_URL + API + 'modules_manager/availableModules',
  UPDATE_STATUS_API:
    'https://bunchofdeals.com.au/APP/API/Update_Order_Status.php',

  //payment
  API_PAYMENT_GATEWAY: CLONE_BASE_URL + API + 'order_payment/getPayments',
  API_PAYMENT_LINK: CLONE_BASE_URL + API + 'order_payment/get_payment_link',
  API_PAYMENT_LINK_CALL: CLONE_BASE_URL + API + 'order_payment/link_call',

  // content
  TERMS_OF_USE_URL: 'https://bunchofdeals.com.au/terms&services.php',
  PRIVACY_POLICY_URL: 'https://bunchofdeals.com.au/privacypolicy.php',
};
