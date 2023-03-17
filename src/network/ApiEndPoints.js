// export const BASE_URL = 'https://bunchofdeals.com.au/APP_CLONE/index.php/user/Api/';
export const BASE_URL =
  'https://bunchofdeals.com.au/APP_CLONE/index.php/api/1.0/';

export const API_END_POINTS = {
  signUp: `${BASE_URL}signup`,
  signin: `${BASE_URL}signin`,

  //user API's
  SIGN_UP: `${BASE_URL}signup`,
  SIGN_IN: `${BASE_URL}signin`,
  VERIFY_OTP: `${BASE_URL}verifyOTP`,
  RESEND_OTP: `${BASE_URL}resendOTP`,
  VERIFY_FACEBOOK: `${BASE_URL}verifyfacebook`,
  VERIFY_GOOGLEPLUS: `${BASE_URL}verifygoogleplus`,
  CHECK_USER_CONNECTION: `${BASE_URL}checkUserConnection`,
  BLOCK_USER: `${BASE_URL}blockUser`,
  GET_USERS: `${BASE_URL}getUsers`,
  UPDATE_ACCOUNT: `${BASE_URL}updateAccount`,
  INSERT_FCM_ID: `${BASE_URL}insertFcmid`,
  REFRESH_POSITION: `${BASE_URL}refreshPosition`,
  // https://bunchofdeals.com.au/APP/index.php/api/1.0/offer/getOffers
  // https://bunchofdeals.com.au/APP/index.php/1.0/offer/getOffers

  //store API's
  GET_STORES: `${BASE_URL}/store/getStores`,
  GET_COMMENTS: `${BASE_URL}/store/getComments`,
  UPDATE_STORE: `${BASE_URL}/webservice/updateStore`,
  STORE_RATE: `${BASE_URL}/store/rate`,
  SAVE_STORE: `${BASE_URL}/store/saveStore`,
  REMOVE_STORE: `${BASE_URL}/store/removeStore`,

  //event API's
  GET_EVENTS: `${BASE_URL}/event/getEvents`,

  //category API's
  GET_CATEGORIES: `${BASE_URL}/category/getCategories`,

  //uploader API's
  UPLOAD_IMAGE64: `${BASE_URL}/uploader/uploadImage64`,

  //setting API's
  APP_INITIALIZATION: `${BASE_URL}/setting/app_initialization`,

  //messenger API's
  LOAD_MESSAGES: `${BASE_URL}/messenger/loadMessages`,
  LOAD_DISCUSSION: `${BASE_URL}/messenger/loadDiscussion`,
  MARK_MESSAGES_AS_SEEN: `${BASE_URL}/messenger/markMessagesAsSeen`,
  MARK_MESSAGES_AS_LOADED: `${BASE_URL}/messenger/markMessagesAsLoaded`,
  SEND_MESSAGE: `${BASE_URL}/messenger/sendMessage`,

  //offer API's
  API_GET_OFFERS: `${BASE_URL}/offer/getOffers`,
  SAVE_OFFER: `${BASE_URL}/offer/saveOffer`,
  REMOVE_OFFER: `${BASE_URL}/offer/removeOffer`,

  //campaign API's
  MARK_VIEW: `${BASE_URL}/campaign/markView`,
  MARK_RECEIVE: `${BASE_URL}/campaign/markReceive`,

  //gallery
  GET_GALLERY: `${BASE_URL}/gallery/getGallery`,

  //Notification API's
  GET_NOTIFICATIONS_NEW: `${BASE_URL}/nshistoric/getNotifications_new`,
  GET_COUNT: `${BASE_URL}/nshistoric/getCount`,
  CHANGE_STATUS: `${BASE_URL}/nshistoric/changeStatus`,
  REMOVE: `${BASE_URL}/nshistoric/remove`,
  NOTIFICATION_AGREEMENT: `${BASE_URL}/campaign/notification_agreement`,

  //Orders
  GET_ORDERS: `${BASE_URL}/nsorder/getOrders`,
  CREATE_ORDER_AND: `${BASE_URL}/nsorder/createOrderAnd`,
  CREATE_ORDER_COD: `${BASE_URL}/nsorder/createOrder_cod`,

  //Modules
  AVAILABLE_MODULES: `${BASE_URL}/modules_manager/availableModules`,

  //payment
  GET_PAYMENTS: `${BASE_URL}/order_payment/getPayments`,
  GET_PAYMENT_LINK: `${BASE_URL}/order_payment/get_payment_link`,
  LINK_CALL: `${BASE_URL}/order_payment/link_call`,
};
