
export const buildForm = (data) => {
  const formData = new window.FormData()

  for (const key in data) {
    formData.append(key, data[key])
  }

  return formData
}