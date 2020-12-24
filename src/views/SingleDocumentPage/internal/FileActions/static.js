import { styleguide } from '../../../../constants'

const { colors } = styleguide

const normal = {
  color: colors.primary,
  fontSize: '1.8rem'
}

const active = {
  color: colors.green,
  fontSize: '1.8rem'
}

const decline = {
  color: colors.red,
  fontSize: '1.8rem'
}

const disabled = {
  color: colors.gray.middle,
  fontSize: '1.8rem',
  cursor: 'not-allowed'
}

const agreeText = [
  {
    status: 1,
    text: 'Согласование не требуется'
  },
  {
    status: 2,
    text: 'Согласовать документ'
  },
  {
    status: 3,
    text: 'Нельзя согласовать, документ для подписания'
  },
  {
    status: 4,
    text: 'Документ уже согласован'
  },
  {
    status: 6,
    text: 'Документ отклонен'
  }
]

const declineText = [
  {
    status: 1,
    text: 'Нельзя отклонить, документ для ознакомления'
  },
  {
    status: 2,
    text: 'Отказать в согласовании'
  },
  {
    status: 3,
    text: 'Отказать в подписании'
  },
  {
    status: 4,
    text: 'Нельзя отклонить, документ согласован'
  },
  {
    status: 6,
    text: 'Документ отклонен'
  }
]

const verifyText = [
  {
    status: 1,
    text: 'Подписание не требуется'
  },
  {
    status: 2,
    text: 'ЭЦП не требуется, документ для согласования'
  },
  {
    status: 3,
    text: 'Подписать документ (ЭЦП)'
  },
  {
    status: 4,
    text: 'ЭЦП не требуется, документ согласован'
  },
  {
    status: 6,
    text: 'Документ отклонен'
  }
]

const agreeStyle = [
  {
    status: 1,
    style: disabled
  },
  {
    status: 2,
    style: normal
  },
  {
    status: 3,
    style: disabled
  },
  {
    status: 4,
    style: active
  },
  {
    status: 6,
    style: disabled
  }
]

const declineStyle = [
  {
    status: 1,
    style: disabled
  },
  {
    status: 2,
    style: normal
  },
  {
    status: 3,
    style: normal
  },
  {
    status: 4,
    style: disabled
  },
  {
    status: 6,
    style: decline
  }
]

const verifyStyle = [
  {
    status: 1,
    style: disabled
  },
  {
    status: 2,
    style: disabled
  },
  {
    status: 3,
    style: normal
  },
  {
    status: 4,
    style: disabled
  },
  {
    status: 6,
    style: disabled
  }
]

export {
  normal,
  active,
  decline,
  disabled,
  agreeText,
  declineText,
  verifyText,
  agreeStyle,
  declineStyle,
  verifyStyle
}
