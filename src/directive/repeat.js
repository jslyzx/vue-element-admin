function repeat(el, binding) {
  el.addEventListener('click', () => {
    if (!el.disabled) {
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
      }, binding.value || 2000)
    }
  })
}

export default {
  inserted(el, binding) {
    repeat(el, binding)
  },
  update(el, binding) {
    repeat(el, binding)
  }
}
