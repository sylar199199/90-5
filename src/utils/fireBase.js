export function changeShow (eventName, EventParams) {
  // ...some action
  const analytics = window.firebase.analytics()
  analytics.logEvent(eventName, EventParams) // 调用
  // window.firebase.analytics().logEvent(eventName, EventParams)
  // window.gtag('event', eventName, EventParams)
  // console.log(eventName)
  // console.log(EventParams)
}
