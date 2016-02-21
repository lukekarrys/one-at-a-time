// https://www.kirupa.com/html5/get_element_position_using_javascript.htm
export default (element) => {
  let y = 0;
  const winHeight = window.innerHeight;

  while (element) {
    y += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return {
    y,
    half: y < (winHeight / 2) ? 'top' : 'bottom'
  };
};
