export default function() {
  this.transition(
    this.hasClass('fade'),
    this.use('fade', { duration: 300 })
  );
}
