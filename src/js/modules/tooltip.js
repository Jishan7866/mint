import {
  select,
  selectAll
} from './helpers'

export default function tooltip() {

  const checkTooltipPair = () => {
    Array.from(selectAll('.tooltip-icon')).forEach(tooltipIcon => {
      Array.from(tooltipIcon.classList).forEach(className => {
        if (className === 'tooltip-icon') return
        if (!select(`.${className}.tooltip-text`)) {
          tooltipIcon.classList.remove('tooltip-icon')
        }
      })
    })
  }

  const createCloseButtons = () => {
    Array.from(selectAll('.tooltip-text')).forEach(tooltip => {
      const closeButton = document.createElement('div')
      closeButton.classList.add('tooltip-close')
      tooltip.appendChild(closeButton)
    })
  }

  const handler = e => {
    const tooltipIcon = e.target.closest('.tooltip-icon')
    const tooltipClose = e.target.closest('.tooltip-close')
    let targetClass

    if (!tooltipIcon) {
      Array.from(selectAll('.tooltip-text')).forEach(tooltip => {
        tooltip.classList.remove('showed')
        tooltip.classList.remove('showed--right-align')
        tooltip.classList.remove('showed--left-align')
      })
      return
    }

    if (tooltipClose) {
      e.target.closest('.tooltip-text').classList.remove('showed')
      e.target.closest('.tooltip-text').classList.remove('showed--right-align')
      e.target.closest('.tooltip-text').classList.remove('showed--left-align')
      return
    }

    Array.from(tooltipIcon.classList).forEach(className => {
      if (className === 'tooltip-icon') return
      targetClass = className
    })

    const tooltipText = select(`.${targetClass}.tooltip-text`)
    if (!tooltipText) return
    if (tooltipText.classList.contains('showed')) return

    Array.from(selectAll('.tooltip-text')).forEach(tooltip => tooltip.classList.remove('showed'))
    tooltipIcon.appendChild(tooltipText)
    const documentWidth = document.documentElement.offsetWidth
    const tooltipTextCoords = tooltipText.getBoundingClientRect()

    setTimeout(() => {
      tooltipText.classList.add('showed')
      if (tooltipTextCoords.right > (documentWidth - 30))
        tooltipText.classList.add('showed--right-align')
      if (tooltipTextCoords.left < 30)
        tooltipText.classList.add('showed--left-align')
    }, 10)
  }

  document.addEventListener('DOMContentLoaded', checkTooltipPair)
  document.addEventListener('DOMContentLoaded', createCloseButtons)
  document.addEventListener('click', handler)
}
