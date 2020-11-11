const disabled = {
  color: '#E0E0E0',
  fontSize: '1.6rem',
  cursor: 'not-allowed'
}
export const normal = {
  color: '#3278fb',
  fontSize: '1.6rem'
}

const active = {
  color: 'green',
  fontSize: '1.6rem'
}

const decline = {
  color: 'red',
  fontSize: '1.6rem'
}

export const agreeText = [
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

export const declineText = [
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

export const verifyText = [
  {
    status: 1,
    text: 'Подписание не требуется',
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

export const agreeStyle = [
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

export const declineStyle = [
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

export const verifyStyle = [
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
