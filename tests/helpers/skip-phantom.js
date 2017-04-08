export default function skipPhantom(fn) {

  if (!/PhantomJS/.test(window.navigator.userAgent)) {
    fn();
  }

}
