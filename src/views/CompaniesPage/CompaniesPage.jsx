import React, { Fragment, useEffect, useState } from 'react'
import useForm from 'rc-form-hooks'
import { Link } from 'react-router-dom'
import { api } from '../../services'
import { CompanyCreate } from '../../components'
import {
  Table,
  Tag,
  Popconfirm,
  Form,
  message,
  Modal,
  Typography,
  Icon,
  Row,
  Col,
  Input,
  Button
} from 'antd'

import history from '../../history'
import './CompaniesPage.scss'

const defaultCompanyState = {
  newUserEmail: '',
  yourPosition: '',
  showInput: false,
  showModal: false,
  modalFetching: false,
  newCompany: {}
}

const { Text } = Typography

// eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/!!document.documentMode

const CompaniesPage = props => {
  const {
    getCompanies,
    changeActiveCompanyById,
    companies: { isFetching, list },
    user: { data }
  } = props

  const { getFieldDecorator, validateFields } = useForm()

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  useEffect(() => {
    getCompanies()
  }, [])

  const onClick = () => {
    setCompanyState({
      ...companyState,
      showModal: true
      // newCompany: getCompanyData()
    })
  }

  const changeActiveCompany = company => {
    if (company.company_data.id === data.active_company_id) {
      message.error('Компания является активной!')
      return null
    } else {
      changeActiveCompanyById(company.company_data.id)
        .then(() => {
          message.success('Активная компания изменена успешно!')

          const inputVerifiedDataArray = Array.from(document.getElementsByClassName('verifiedData'))
          inputVerifiedDataArray.forEach(i => {
            i.parentNode.removeChild(i)
          })
          setTimeout(() => {
            try {
              // window.pluginLoaded()
            } catch (error) {
            }
          }, 1000)
        })
        .catch(error => {
          {
            "name": "quidox_react",
            "version": "0.1.0",
            "lockfileVersion": 1,
            "requires": true,
            "dependencies": {
            "@ant-design/colors": {
              "version": "3.2.2",
                "resolved": "https://registry.npmjs.org/@ant-design/colors/-/colors-3.2.2.tgz",
                "integrity": "sha512-YKgNbG2dlzqMhA9NtI3/pbY16m3Yl/EeWBRa+lB1X1YaYxHrxNexiQYCLTWO/uDvAjLFMEDU+zR901waBtMtjQ==",
                "requires": {
                "tinycolor2": "^1.4.1"
              }
            },
            "@ant-design/create-react-context": {
              "version": "0.2.5",
                "resolved": "https://registry.npmjs.org/@ant-design/create-react-context/-/create-react-context-0.2.5.tgz",
                "integrity": "sha512-1rMAa4qgP2lfl/QBH9i78+Gjxtj9FTMpMyDGZsEBW5Kih72EuUo9958mV8PgpRkh4uwPSQ7vVZWXeyNZXVAFDg==",
                "requires": {
                "gud": "^1.0.0",
                  "warning": "^4.0.3"
              }
            },
            "@ant-design/icons": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/@ant-design/icons/-/icons-2.0.1.tgz",
                "integrity": "sha512-SqiNhgoivKczEqIJc/9hntgtvmq4R3Ef73ehibqDPAT059IjsXXM7nze0S5P8F4HP76jgPiv5od+2JUhQl/nig=="
            },
            "@ant-design/icons-react": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/@ant-design/icons-react/-/icons-react-2.0.1.tgz",
                "integrity": "sha512-r1QfoltMuruJZqdiKcbPim3d8LNsVPB733U0gZEUSxBLuqilwsW28K2rCTWSMTjmFX7Mfpf+v/wdiFe/XCqThw==",
                "requires": {
                "@ant-design/colors": "^3.1.0",
                  "babel-runtime": "^6.26.0"
              }
            },
            "@babel/code-frame": {
              "version": "7.0.0",
                "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.0.0.tgz",
                "integrity": "sha512-OfC2uemaknXr87bdLUkWog7nYuliM9Ij5HUcajsVcMCpQrcLmtxRbVFTIqmcSkSeYRBFBRxs2FiUqFJDLdiebA==",
                "requires": {
                "@babel/highlight": "^7.0.0"
              }
            },
            "@babel/core": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.7.4.tgz",
                "integrity": "sha512-+bYbx56j4nYBmpsWtnPUsKW3NdnYxbqyfrP2w9wILBuHzdfIKz9prieZK0DFPyIzkjYVUe4QkusGL07r5pXznQ==",
                "requires": {
                "@babel/code-frame": "^7.5.5",
                  "@babel/generator": "^7.7.4",
                  "@babel/helpers": "^7.7.4",
                  "@babel/parser": "^7.7.4",
                  "@babel/template": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4",
                  "convert-source-map": "^1.7.0",
                  "debug": "^4.1.0",
                  "json5": "^2.1.0",
                  "lodash": "^4.17.13",
                  "resolve": "^1.3.2",
                  "semver": "^5.4.1",
                  "source-map": "^0.5.0"
              },
              "dependencies": {
                "@babel/code-frame": {
                  "version": "7.5.5",
                    "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.5.5.tgz",
                    "integrity": "sha512-27d4lZoomVyo51VegxI20xZPuSHusqbQag/ztrBC7wegWoQ1nLREPVSKSW8byhTlzTKyNE4ifaTA6lCp7JjpFw==",
                    "requires": {
                    "@babel/highlight": "^7.0.0"
                  }
                },
                "convert-source-map": {
                  "version": "1.7.0",
                    "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.7.0.tgz",
                    "integrity": "sha512-4FJkXzKXEDB1snCFZlLP4gpC3JILicCpGbzG9f9G7tGqGCzETQ2hWPrcinA9oU4wtf2biUaEH5065UnMeR33oA==",
                    "requires": {
                    "safe-buffer": "~5.1.1"
                  }
                },
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                }
              }
            },
            "@babel/generator": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.7.7.tgz",
                "integrity": "sha512-/AOIBpHh/JU1l0ZFS4kiRCBnLi6OTHzh0RPk3h9isBxkkqELtQNFi1Vr/tiG9p1yfoUdKVwISuXWQR+hwwM4VQ==",
                "requires": {
                "@babel/types": "^7.7.4",
                  "jsesc": "^2.5.1",
                  "lodash": "^4.17.13",
                  "source-map": "^0.5.0"
              }
            },
            "@babel/helper-annotate-as-pure": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.7.4.tgz",
                "integrity": "sha512-2BQmQgECKzYKFPpiycoF9tlb5HA4lrVyAmLLVK177EcQAqjVLciUb2/R+n1boQ9y5ENV3uz2ZqiNw7QMBBw1Og==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-builder-binary-assignment-operator-visitor": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-builder-binary-assignment-operator-visitor/-/helper-builder-binary-assignment-operator-visitor-7.7.4.tgz",
                "integrity": "sha512-Biq/d/WtvfftWZ9Uf39hbPBYDUo986m5Bb4zhkeYDGUllF43D+nUe5M6Vuo6/8JDK/0YX/uBdeoQpyaNhNugZQ==",
                "requires": {
                "@babel/helper-explode-assignable-expression": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-builder-react-jsx": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-builder-react-jsx/-/helper-builder-react-jsx-7.7.4.tgz",
                "integrity": "sha512-kvbfHJNN9dg4rkEM4xn1s8d1/h6TYNvajy9L1wx4qLn9HFg0IkTsQi4rfBe92nxrPUFcMsHoMV+8rU7MJb3fCA==",
                "requires": {
                "@babel/types": "^7.7.4",
                  "esutils": "^2.0.0"
              }
            },
            "@babel/helper-call-delegate": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-call-delegate/-/helper-call-delegate-7.7.4.tgz",
                "integrity": "sha512-8JH9/B7J7tCYJ2PpWVpw9JhPuEVHztagNVuQAFBVFYluRMlpG7F1CgKEgGeL6KFqcsIa92ZYVj6DSc0XwmN1ZA==",
                "requires": {
                "@babel/helper-hoist-variables": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-create-class-features-plugin": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.7.4.tgz",
                "integrity": "sha512-l+OnKACG4uiDHQ/aJT8dwpR+LhCJALxL0mJ6nzjB25e5IPwqV1VOsY7ah6UB1DG+VOXAIMtuC54rFJGiHkxjgA==",
                "requires": {
                "@babel/helper-function-name": "^7.7.4",
                  "@babel/helper-member-expression-to-functions": "^7.7.4",
                  "@babel/helper-optimise-call-expression": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-replace-supers": "^7.7.4",
                  "@babel/helper-split-export-declaration": "^7.7.4"
              }
            },
            "@babel/helper-create-regexp-features-plugin": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.7.4.tgz",
                "integrity": "sha512-Mt+jBKaxL0zfOIWrfQpnfYCN7/rS6GKx6CCCfuoqVVd+17R8zNDlzVYmIi9qyb2wOk002NsmSTDymkIygDUH7A==",
                "requires": {
                "@babel/helper-regex": "^7.4.4",
                  "regexpu-core": "^4.6.0"
              }
            },
            "@babel/helper-define-map": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-define-map/-/helper-define-map-7.7.4.tgz",
                "integrity": "sha512-v5LorqOa0nVQUvAUTUF3KPastvUt/HzByXNamKQ6RdJRTV7j8rLL+WB5C/MzzWAwOomxDhYFb1wLLxHqox86lg==",
                "requires": {
                "@babel/helper-function-name": "^7.7.4",
                  "@babel/types": "^7.7.4",
                  "lodash": "^4.17.13"
              }
            },
            "@babel/helper-explode-assignable-expression": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-explode-assignable-expression/-/helper-explode-assignable-expression-7.7.4.tgz",
                "integrity": "sha512-2/SicuFrNSXsZNBxe5UGdLr+HZg+raWBLE9vC98bdYOKX/U6PY0mdGlYUJdtTDPSU0Lw0PNbKKDpwYHJLn2jLg==",
                "requires": {
                "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-function-name": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-function-name/-/helper-function-name-7.7.4.tgz",
                "integrity": "sha512-AnkGIdiBhEuiwdoMnKm7jfPfqItZhgRaZfMg1XX3bS25INOnLPjPG1Ppnajh8eqgt5kPJnfqrRHqFqmjKDZLzQ==",
                "requires": {
                "@babel/helper-get-function-arity": "^7.7.4",
                  "@babel/template": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-get-function-arity": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-get-function-arity/-/helper-get-function-arity-7.7.4.tgz",
                "integrity": "sha512-QTGKEdCkjgzgfJ3bAyRwF4yyT3pg+vDgan8DSivq1eS0gwi+KGKE5x8kRcbeFTb/673mkO5SN1IZfmCfA5o+EA==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-hoist-variables": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-hoist-variables/-/helper-hoist-variables-7.7.4.tgz",
                "integrity": "sha512-wQC4xyvc1Jo/FnLirL6CEgPgPCa8M74tOdjWpRhQYapz5JC7u3NYU1zCVoVAGCE3EaIP9T1A3iW0WLJ+reZlpQ==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-member-expression-to-functions": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.7.4.tgz",
                "integrity": "sha512-9KcA1X2E3OjXl/ykfMMInBK+uVdfIVakVe7W7Lg3wfXUNyS3Q1HWLFRwZIjhqiCGbslummPDnmb7vIekS0C1vw==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-module-imports": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.7.4.tgz",
                "integrity": "sha512-dGcrX6K9l8258WFjyDLJwuVKxR4XZfU0/vTUgOQYWEnRD8mgr+p4d6fCUMq/ys0h4CCt/S5JhbvtyErjWouAUQ==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-module-transforms": {
              "version": "7.7.5",
                "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.7.5.tgz",
                "integrity": "sha512-A7pSxyJf1gN5qXVcidwLWydjftUN878VkalhXX5iQDuGyiGK3sOrrKKHF4/A4fwHtnsotv/NipwAeLzY4KQPvw==",
                "requires": {
                "@babel/helper-module-imports": "^7.7.4",
                  "@babel/helper-simple-access": "^7.7.4",
                  "@babel/helper-split-export-declaration": "^7.7.4",
                  "@babel/template": "^7.7.4",
                  "@babel/types": "^7.7.4",
                  "lodash": "^4.17.13"
              }
            },
            "@babel/helper-optimise-call-expression": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.7.4.tgz",
                "integrity": "sha512-VB7gWZ2fDkSuqW6b1AKXkJWO5NyNI3bFL/kK79/30moK57blr6NbH8xcl2XcKCwOmJosftWunZqfO84IGq3ZZg==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-plugin-utils": {
              "version": "7.0.0",
                "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.0.0.tgz",
                "integrity": "sha512-CYAOUCARwExnEixLdB6sDm2dIJ/YgEAKDM1MOeMeZu9Ld/bDgVo8aiWrXwcY7OBh+1Ea2uUcVRcxKk0GJvW7QA=="
            },
            "@babel/helper-regex": {
              "version": "7.5.5",
                "resolved": "https://registry.npmjs.org/@babel/helper-regex/-/helper-regex-7.5.5.tgz",
                "integrity": "sha512-CkCYQLkfkiugbRDO8eZn6lRuR8kzZoGXCg3149iTk5se7g6qykSpy3+hELSwquhu+TgHn8nkLiBwHvNX8Hofcw==",
                "requires": {
                "lodash": "^4.17.13"
              }
            },
            "@babel/helper-remap-async-to-generator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.7.4.tgz",
                "integrity": "sha512-Sk4xmtVdM9sA/jCI80f+KS+Md+ZHIpjuqmYPk1M7F/upHou5e4ReYmExAiu6PVe65BhJPZA2CY9x9k4BqE5klw==",
                "requires": {
                "@babel/helper-annotate-as-pure": "^7.7.4",
                  "@babel/helper-wrap-function": "^7.7.4",
                  "@babel/template": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-replace-supers": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.7.4.tgz",
                "integrity": "sha512-pP0tfgg9hsZWo5ZboYGuBn/bbYT/hdLPVSS4NMmiRJdwWhP0IznPwN9AE1JwyGsjSPLC364I0Qh5p+EPkGPNpg==",
                "requires": {
                "@babel/helper-member-expression-to-functions": "^7.7.4",
                  "@babel/helper-optimise-call-expression": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-simple-access": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.7.4.tgz",
                "integrity": "sha512-zK7THeEXfan7UlWsG2A6CI/L9jVnI5+xxKZOdej39Y0YtDYKx9raHk5F2EtK9K8DHRTihYwg20ADt9S36GR78A==",
                "requires": {
                "@babel/template": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-split-export-declaration": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.7.4.tgz",
                "integrity": "sha512-guAg1SXFcVr04Guk9eq0S4/rWS++sbmyqosJzVs8+1fH5NI+ZcmkaSkc7dmtAFbHFva6yRJnjW3yAcGxjueDug==",
                "requires": {
                "@babel/types": "^7.7.4"
              }
            },
            "@babel/helper-wrap-function": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.7.4.tgz",
                "integrity": "sha512-VsfzZt6wmsocOaVU0OokwrIytHND55yvyT4BPB9AIIgwr8+x7617hetdJTsuGwygN5RC6mxA9EJztTjuwm2ofg==",
                "requires": {
                "@babel/helper-function-name": "^7.7.4",
                  "@babel/template": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/helpers": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.7.4.tgz",
                "integrity": "sha512-ak5NGZGJ6LV85Q1Zc9gn2n+ayXOizryhjSUBTdu5ih1tlVCJeuQENzc4ItyCVhINVXvIT/ZQ4mheGIsfBkpskg==",
                "requires": {
                "@babel/template": "^7.7.4",
                  "@babel/traverse": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/highlight": {
              "version": "7.5.0",
                "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.5.0.tgz",
                "integrity": "sha512-7dV4eu9gBxoM0dAnj/BCFDW9LFU0zvTrkq0ugM7pnHEgguOEeOz1so2ZghEdzviYzQEED0r4EAgpsBChKy1TRQ==",
                "requires": {
                "chalk": "^2.0.0",
                  "esutils": "^2.0.2",
                  "js-tokens": "^4.0.0"
              }
            },
            "@babel/parser": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.7.7.tgz",
                "integrity": "sha512-WtTZMZAZLbeymhkd/sEaPD8IQyGAhmuTuvTzLiCFM7iXiVdY0gc0IaI+cW0fh1BnSMbJSzXX6/fHllgHKwHhXw=="
            },
            "@babel/plugin-proposal-async-generator-functions": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-async-generator-functions/-/plugin-proposal-async-generator-functions-7.7.4.tgz",
                "integrity": "sha512-1ypyZvGRXriY/QP668+s8sFr2mqinhkRDMPSQLNghCQE+GAkFtp+wkHVvg2+Hdki8gwP+NFzJBJ/N1BfzCCDEw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-remap-async-to-generator": "^7.7.4",
                  "@babel/plugin-syntax-async-generators": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-class-properties": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-class-properties/-/plugin-proposal-class-properties-7.7.4.tgz",
                "integrity": "sha512-EcuXeV4Hv1X3+Q1TsuOmyyxeTRiSqurGJ26+I/FW1WbymmRRapVORm6x1Zl3iDIHyRxEs+VXWp6qnlcfcJSbbw==",
                "requires": {
                "@babel/helper-create-class-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-proposal-decorators": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-decorators/-/plugin-proposal-decorators-7.7.4.tgz",
                "integrity": "sha512-GftcVDcLCwVdzKmwOBDjATd548+IE+mBo7ttgatqNDR7VG7GqIuZPtRWlMLHbhTXhcnFZiGER8iIYl1n/imtsg==",
                "requires": {
                "@babel/helper-create-class-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-decorators": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-dynamic-import": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-dynamic-import/-/plugin-proposal-dynamic-import-7.7.4.tgz",
                "integrity": "sha512-StH+nGAdO6qDB1l8sZ5UBV8AC3F2VW2I8Vfld73TMKyptMU9DY5YsJAS8U81+vEtxcH3Y/La0wG0btDrhpnhjQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-dynamic-import": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-json-strings": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-json-strings/-/plugin-proposal-json-strings-7.7.4.tgz",
                "integrity": "sha512-wQvt3akcBTfLU/wYoqm/ws7YOAQKu8EVJEvHip/mzkNtjaclQoCCIqKXFP5/eyfnfbQCDV3OLRIK3mIVyXuZlw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-json-strings": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-nullish-coalescing-operator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-nullish-coalescing-operator/-/plugin-proposal-nullish-coalescing-operator-7.7.4.tgz",
                "integrity": "sha512-TbYHmr1Gl1UC7Vo2HVuj/Naci5BEGNZ0AJhzqD2Vpr6QPFWpUmBRLrIDjedzx7/CShq0bRDS2gI4FIs77VHLVQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-nullish-coalescing-operator": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-numeric-separator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-numeric-separator/-/plugin-proposal-numeric-separator-7.7.4.tgz",
                "integrity": "sha512-CG605v7lLpVgVldSY6kxsN9ui1DxFOyepBfuX2AzU2TNriMAYApoU55mrGw9Jr4TlrTzPCG10CL8YXyi+E/iPw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-numeric-separator": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-object-rest-spread": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-object-rest-spread/-/plugin-proposal-object-rest-spread-7.7.7.tgz",
                "integrity": "sha512-3qp9I8lelgzNedI3hrhkvhaEYree6+WHnyA/q4Dza9z7iEIs1eyhWyJnetk3jJ69RT0AT4G0UhEGwyGFJ7GUuQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-object-rest-spread": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-optional-catch-binding": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-catch-binding/-/plugin-proposal-optional-catch-binding-7.7.4.tgz",
                "integrity": "sha512-DyM7U2bnsQerCQ+sejcTNZh8KQEUuC3ufzdnVnSiUv/qoGJp2Z3hanKL18KDhsBT5Wj6a7CMT5mdyCNJsEaA9w==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-optional-catch-binding": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-optional-chaining": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-optional-chaining/-/plugin-proposal-optional-chaining-7.7.4.tgz",
                "integrity": "sha512-JmgaS+ygAWDR/STPe3/7y0lNlHgS+19qZ9aC06nYLwQ/XB7c0q5Xs+ksFU3EDnp9EiEsO0dnRAOKeyLHTZuW3A==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-optional-chaining": "^7.7.4"
              }
            },
            "@babel/plugin-proposal-unicode-property-regex": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-unicode-property-regex/-/plugin-proposal-unicode-property-regex-7.7.7.tgz",
                "integrity": "sha512-80PbkKyORBUVm1fbTLrHpYdJxMThzM1UqFGh0ALEhO9TYbG86Ah9zQYAB/84axz2vcxefDLdZwWwZNlYARlu9w==",
                "requires": {
                "@babel/helper-create-regexp-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-async-generators": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-async-generators/-/plugin-syntax-async-generators-7.7.4.tgz",
                "integrity": "sha512-Li4+EjSpBgxcsmeEF8IFcfV/+yJGxHXDirDkEoyFjumuwbmfCVHUt0HuowD/iGM7OhIRyXJH9YXxqiH6N815+g==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-decorators": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-decorators/-/plugin-syntax-decorators-7.7.4.tgz",
                "integrity": "sha512-0oNLWNH4k5ZbBVfAwiTU53rKFWIeTh6ZlaWOXWJc4ywxs0tjz5fc3uZ6jKAnZSxN98eXVgg7bJIuzjX+3SXY+A==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-dynamic-import": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-dynamic-import/-/plugin-syntax-dynamic-import-7.7.4.tgz",
                "integrity": "sha512-jHQW0vbRGvwQNgyVxwDh4yuXu4bH1f5/EICJLAhl1SblLs2CDhrsmCk+v5XLdE9wxtAFRyxx+P//Iw+a5L/tTg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-flow": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-flow/-/plugin-syntax-flow-7.7.4.tgz",
                "integrity": "sha512-2AMAWl5PsmM5KPkB22cvOkUyWk6MjUaqhHNU5nSPUl/ns3j5qLfw2SuYP5RbVZ0tfLvePr4zUScbICtDP2CUNw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-json-strings": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-json-strings/-/plugin-syntax-json-strings-7.7.4.tgz",
                "integrity": "sha512-QpGupahTQW1mHRXddMG5srgpHWqRLwJnJZKXTigB9RPFCCGbDGCgBeM/iC82ICXp414WeYx/tD54w7M2qRqTMg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-jsx": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.7.4.tgz",
                "integrity": "sha512-wuy6fiMe9y7HeZBWXYCGt2RGxZOj0BImZ9EyXJVnVGBKO/Br592rbR3rtIQn0eQhAk9vqaKP5n8tVqEFBQMfLg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-nullish-coalescing-operator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-nullish-coalescing-operator/-/plugin-syntax-nullish-coalescing-operator-7.7.4.tgz",
                "integrity": "sha512-XKh/yIRPiQTOeBg0QJjEus5qiSKucKAiApNtO1psqG7D17xmE+X2i5ZqBEuSvo0HRuyPaKaSN/Gy+Ha9KFQolw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-numeric-separator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-numeric-separator/-/plugin-syntax-numeric-separator-7.7.4.tgz",
                "integrity": "sha512-vmlUUBlLuFnbpaR+1kKIdo62xQEN+THWbtAHSEilo+0rHl2dKKCn6GLUVKpI848wL/T0ZPQgAy8asRJ9yYEjog==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-object-rest-spread": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-object-rest-spread/-/plugin-syntax-object-rest-spread-7.7.4.tgz",
                "integrity": "sha512-mObR+r+KZq0XhRVS2BrBKBpr5jqrqzlPvS9C9vuOf5ilSwzloAl7RPWLrgKdWS6IreaVrjHxTjtyqFiOisaCwg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-optional-catch-binding": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-catch-binding/-/plugin-syntax-optional-catch-binding-7.7.4.tgz",
                "integrity": "sha512-4ZSuzWgFxqHRE31Glu+fEr/MirNZOMYmD/0BhBWyLyOOQz/gTAl7QmWm2hX1QxEIXsr2vkdlwxIzTyiYRC4xcQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-optional-chaining": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-optional-chaining/-/plugin-syntax-optional-chaining-7.7.4.tgz",
                "integrity": "sha512-2MqYD5WjZSbJdUagnJvIdSfkb/ucOC9/1fRJxm7GAxY6YQLWlUvkfxoNbUPcPLHJyetKUDQ4+yyuUyAoc0HriA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-top-level-await": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-top-level-await/-/plugin-syntax-top-level-await-7.7.4.tgz",
                "integrity": "sha512-wdsOw0MvkL1UIgiQ/IFr3ETcfv1xb8RMM0H9wbiDyLaJFyiDg5oZvDLCXosIXmFeIlweML5iOBXAkqddkYNizg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-syntax-typescript": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.7.4.tgz",
                "integrity": "sha512-77blgY18Hud4NM1ggTA8xVT/dBENQf17OpiToSa2jSmEY3fWXD2jwrdVlO4kq5yzUTeF15WSQ6b4fByNvJcjpQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-arrow-functions": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-arrow-functions/-/plugin-transform-arrow-functions-7.7.4.tgz",
                "integrity": "sha512-zUXy3e8jBNPiffmqkHRNDdZM2r8DWhCB7HhcoyZjiK1TxYEluLHAvQuYnTT+ARqRpabWqy/NHkO6e3MsYB5YfA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-async-to-generator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-async-to-generator/-/plugin-transform-async-to-generator-7.7.4.tgz",
                "integrity": "sha512-zpUTZphp5nHokuy8yLlyafxCJ0rSlFoSHypTUWgpdwoDXWQcseaect7cJ8Ppk6nunOM6+5rPMkod4OYKPR5MUg==",
                "requires": {
                "@babel/helper-module-imports": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-remap-async-to-generator": "^7.7.4"
              }
            },
            "@babel/plugin-transform-block-scoped-functions": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoped-functions/-/plugin-transform-block-scoped-functions-7.7.4.tgz",
                "integrity": "sha512-kqtQzwtKcpPclHYjLK//3lH8OFsCDuDJBaFhVwf8kqdnF6MN4l618UDlcA7TfRs3FayrHj+svYnSX8MC9zmUyQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-block-scoping": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-block-scoping/-/plugin-transform-block-scoping-7.7.4.tgz",
                "integrity": "sha512-2VBe9u0G+fDt9B5OV5DQH4KBf5DoiNkwFKOz0TCvBWvdAN2rOykCTkrL+jTLxfCAm76l9Qo5OqL7HBOx2dWggg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "lodash": "^4.17.13"
              }
            },
            "@babel/plugin-transform-classes": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-classes/-/plugin-transform-classes-7.7.4.tgz",
                "integrity": "sha512-sK1mjWat7K+buWRuImEzjNf68qrKcrddtpQo3swi9j7dUcG6y6R6+Di039QN2bD1dykeswlagupEmpOatFHHUg==",
                "requires": {
                "@babel/helper-annotate-as-pure": "^7.7.4",
                  "@babel/helper-define-map": "^7.7.4",
                  "@babel/helper-function-name": "^7.7.4",
                  "@babel/helper-optimise-call-expression": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-replace-supers": "^7.7.4",
                  "@babel/helper-split-export-declaration": "^7.7.4",
                  "globals": "^11.1.0"
              }
            },
            "@babel/plugin-transform-computed-properties": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-computed-properties/-/plugin-transform-computed-properties-7.7.4.tgz",
                "integrity": "sha512-bSNsOsZnlpLLyQew35rl4Fma3yKWqK3ImWMSC/Nc+6nGjC9s5NFWAer1YQ899/6s9HxO2zQC1WoFNfkOqRkqRQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-destructuring": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-destructuring/-/plugin-transform-destructuring-7.7.4.tgz",
                "integrity": "sha512-4jFMXI1Cu2aXbcXXl8Lr6YubCn6Oc7k9lLsu8v61TZh+1jny2BWmdtvY9zSUlLdGUvcy9DMAWyZEOqjsbeg/wA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-dotall-regex": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-dotall-regex/-/plugin-transform-dotall-regex-7.7.7.tgz",
                "integrity": "sha512-b4in+YlTeE/QmTgrllnb3bHA0HntYvjz8O3Mcbx75UBPJA2xhb5A8nle498VhxSXJHQefjtQxpnLPehDJ4TRlg==",
                "requires": {
                "@babel/helper-create-regexp-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-duplicate-keys": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-duplicate-keys/-/plugin-transform-duplicate-keys-7.7.4.tgz",
                "integrity": "sha512-g1y4/G6xGWMD85Tlft5XedGaZBCIVN+/P0bs6eabmcPP9egFleMAo65OOjlhcz1njpwagyY3t0nsQC9oTFegJA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-exponentiation-operator": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-exponentiation-operator/-/plugin-transform-exponentiation-operator-7.7.4.tgz",
                "integrity": "sha512-MCqiLfCKm6KEA1dglf6Uqq1ElDIZwFuzz1WH5mTf8k2uQSxEJMbOIEh7IZv7uichr7PMfi5YVSrr1vz+ipp7AQ==",
                "requires": {
                "@babel/helper-builder-binary-assignment-operator-visitor": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-flow-strip-types": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-flow-strip-types/-/plugin-transform-flow-strip-types-7.7.4.tgz",
                "integrity": "sha512-w9dRNlHY5ElNimyMYy0oQowvQpwt/PRHI0QS98ZJCTZU2bvSnKXo5zEiD5u76FBPigTm8TkqzmnUTg16T7qbkA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-flow": "^7.7.4"
              }
            },
            "@babel/plugin-transform-for-of": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-for-of/-/plugin-transform-for-of-7.7.4.tgz",
                "integrity": "sha512-zZ1fD1B8keYtEcKF+M1TROfeHTKnijcVQm0yO/Yu1f7qoDoxEIc/+GX6Go430Bg84eM/xwPFp0+h4EbZg7epAA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-function-name": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-function-name/-/plugin-transform-function-name-7.7.4.tgz",
                "integrity": "sha512-E/x09TvjHNhsULs2IusN+aJNRV5zKwxu1cpirZyRPw+FyyIKEHPXTsadj48bVpc1R5Qq1B5ZkzumuFLytnbT6g==",
                "requires": {
                "@babel/helper-function-name": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-literals": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-literals/-/plugin-transform-literals-7.7.4.tgz",
                "integrity": "sha512-X2MSV7LfJFm4aZfxd0yLVFrEXAgPqYoDG53Br/tCKiKYfX0MjVjQeWPIhPHHsCqzwQANq+FLN786fF5rgLS+gw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-member-expression-literals": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-member-expression-literals/-/plugin-transform-member-expression-literals-7.7.4.tgz",
                "integrity": "sha512-9VMwMO7i69LHTesL0RdGy93JU6a+qOPuvB4F4d0kR0zyVjJRVJRaoaGjhtki6SzQUu8yen/vxPKN6CWnCUw6bA==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-modules-amd": {
              "version": "7.7.5",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-amd/-/plugin-transform-modules-amd-7.7.5.tgz",
                "integrity": "sha512-CT57FG4A2ZUNU1v+HdvDSDrjNWBrtCmSH6YbbgN3Lrf0Di/q/lWRxZrE72p3+HCCz9UjfZOEBdphgC0nzOS6DQ==",
                "requires": {
                "@babel/helper-module-transforms": "^7.7.5",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "babel-plugin-dynamic-import-node": "^2.3.0"
              }
            },
            "@babel/plugin-transform-modules-commonjs": {
              "version": "7.7.5",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.7.5.tgz",
                "integrity": "sha512-9Cq4zTFExwFhQI6MT1aFxgqhIsMWQWDVwOgLzl7PTWJHsNaqFvklAU+Oz6AQLAS0dJKTwZSOCo20INwktxpi3Q==",
                "requires": {
                "@babel/helper-module-transforms": "^7.7.5",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-simple-access": "^7.7.4",
                  "babel-plugin-dynamic-import-node": "^2.3.0"
              }
            },
            "@babel/plugin-transform-modules-systemjs": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-systemjs/-/plugin-transform-modules-systemjs-7.7.4.tgz",
                "integrity": "sha512-y2c96hmcsUi6LrMqvmNDPBBiGCiQu0aYqpHatVVu6kD4mFEXKjyNxd/drc18XXAf9dv7UXjrZwBVmTTGaGP8iw==",
                "requires": {
                "@babel/helper-hoist-variables": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "babel-plugin-dynamic-import-node": "^2.3.0"
              }
            },
            "@babel/plugin-transform-modules-umd": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-umd/-/plugin-transform-modules-umd-7.7.4.tgz",
                "integrity": "sha512-u2B8TIi0qZI4j8q4C51ktfO7E3cQ0qnaXFI1/OXITordD40tt17g/sXqgNNCcMTcBFKrUPcGDx+TBJuZxLx7tw==",
                "requires": {
                "@babel/helper-module-transforms": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-named-capturing-groups-regex": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-named-capturing-groups-regex/-/plugin-transform-named-capturing-groups-regex-7.7.4.tgz",
                "integrity": "sha512-jBUkiqLKvUWpv9GLSuHUFYdmHg0ujC1JEYoZUfeOOfNydZXp1sXObgyPatpcwjWgsdBGsagWW0cdJpX/DO2jMw==",
                "requires": {
                "@babel/helper-create-regexp-features-plugin": "^7.7.4"
              }
            },
            "@babel/plugin-transform-new-target": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-new-target/-/plugin-transform-new-target-7.7.4.tgz",
                "integrity": "sha512-CnPRiNtOG1vRodnsyGX37bHQleHE14B9dnnlgSeEs3ek3fHN1A1SScglTCg1sfbe7sRQ2BUcpgpTpWSfMKz3gg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-object-super": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-object-super/-/plugin-transform-object-super-7.7.4.tgz",
                "integrity": "sha512-ho+dAEhC2aRnff2JCA0SAK7V2R62zJd/7dmtoe7MHcso4C2mS+vZjn1Pb1pCVZvJs1mgsvv5+7sT+m3Bysb6eg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-replace-supers": "^7.7.4"
              }
            },
            "@babel/plugin-transform-parameters": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-parameters/-/plugin-transform-parameters-7.7.7.tgz",
                "integrity": "sha512-OhGSrf9ZBrr1fw84oFXj5hgi8Nmg+E2w5L7NhnG0lPvpDtqd7dbyilM2/vR8CKbJ907RyxPh2kj6sBCSSfI9Ew==",
                "requires": {
                "@babel/helper-call-delegate": "^7.7.4",
                  "@babel/helper-get-function-arity": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-property-literals": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-property-literals/-/plugin-transform-property-literals-7.7.4.tgz",
                "integrity": "sha512-MatJhlC4iHsIskWYyawl53KuHrt+kALSADLQQ/HkhTjX954fkxIEh4q5slL4oRAnsm/eDoZ4q0CIZpcqBuxhJQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-react-constant-elements": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-constant-elements/-/plugin-transform-react-constant-elements-7.7.4.tgz",
                "integrity": "sha512-U6XkHZ8RnmeEb8jBUOpeo6oFka5RhLgxAVvK4/fBbwoYlsHQYLb8I37ymTPDVsrWjqb94+hueuWQA/1OAA4rAQ==",
                "requires": {
                "@babel/helper-annotate-as-pure": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-react-display-name": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-display-name/-/plugin-transform-react-display-name-7.7.4.tgz",
                "integrity": "sha512-sBbIvqYkthai0X0vkD2xsAwluBp+LtNHH+/V4a5ydifmTtb8KOVOlrMIk/MYmIc4uTYDnjZUHQildYNo36SRJw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-react-jsx": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx/-/plugin-transform-react-jsx-7.7.7.tgz",
                "integrity": "sha512-SlPjWPbva2+7/ZJbGcoqjl4LsQaLpKEzxW9hcxU7675s24JmdotJOSJ4cgAbV82W3FcZpHIGmRZIlUL8ayMvjw==",
                "requires": {
                "@babel/helper-builder-react-jsx": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-jsx": "^7.7.4"
              }
            },
            "@babel/plugin-transform-react-jsx-self": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.7.4.tgz",
                "integrity": "sha512-PWYjSfqrO273mc1pKCRTIJXyqfc9vWYBax88yIhQb+bpw3XChVC7VWS4VwRVs63wFHKxizvGSd00XEr+YB9Q2A==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-jsx": "^7.7.4"
              }
            },
            "@babel/plugin-transform-react-jsx-source": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.7.4.tgz",
                "integrity": "sha512-5ZU9FnPhqtHsOXxutRtXZAzoEJwDaP32QcobbMP1/qt7NYcsCNK8XgzJcJfoEr/ZnzVvUNInNjIW22Z6I8p9mg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-jsx": "^7.7.4"
              }
            },
            "@babel/plugin-transform-regenerator": {
              "version": "7.7.5",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.7.5.tgz",
                "integrity": "sha512-/8I8tPvX2FkuEyWbjRCt4qTAgZK0DVy8QRguhA524UH48RfGJy94On2ri+dCuwOpcerPRl9O4ebQkRcVzIaGBw==",
                "requires": {
                "regenerator-transform": "^0.14.0"
              }
            },
            "@babel/plugin-transform-reserved-words": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-reserved-words/-/plugin-transform-reserved-words-7.7.4.tgz",
                "integrity": "sha512-OrPiUB5s5XvkCO1lS7D8ZtHcswIC57j62acAnJZKqGGnHP+TIc/ljQSrgdX/QyOTdEK5COAhuc820Hi1q2UgLQ==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-runtime": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-runtime/-/plugin-transform-runtime-7.7.4.tgz",
                "integrity": "sha512-O8kSkS5fP74Ad/8pfsCMGa8sBRdLxYoSReaARRNSz3FbFQj3z/QUvoUmJ28gn9BO93YfnXc3j+Xyaqe8cKDNBQ==",
                "requires": {
                "@babel/helper-module-imports": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "resolve": "^1.8.1",
                  "semver": "^5.5.1"
              }
            },
            "@babel/plugin-transform-shorthand-properties": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-shorthand-properties/-/plugin-transform-shorthand-properties-7.7.4.tgz",
                "integrity": "sha512-q+suddWRfIcnyG5YiDP58sT65AJDZSUhXQDZE3r04AuqD6d/XLaQPPXSBzP2zGerkgBivqtQm9XKGLuHqBID6Q==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-spread": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.7.4.tgz",
                "integrity": "sha512-8OSs0FLe5/80cndziPlg4R0K6HcWSM0zyNhHhLsmw/Nc5MaA49cAsnoJ/t/YZf8qkG7fD+UjTRaApVDB526d7Q==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-sticky-regex": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-sticky-regex/-/plugin-transform-sticky-regex-7.7.4.tgz",
                "integrity": "sha512-Ls2NASyL6qtVe1H1hXts9yuEeONV2TJZmplLONkMPUG158CtmnrzW5Q5teibM5UVOFjG0D3IC5mzXR6pPpUY7A==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/helper-regex": "^7.0.0"
              }
            },
            "@babel/plugin-transform-template-literals": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.7.4.tgz",
                "integrity": "sha512-sA+KxLwF3QwGj5abMHkHgshp9+rRz+oY9uoRil4CyLtgEuE/88dpkeWgNk5qKVsJE9iSfly3nvHapdRiIS2wnQ==",
                "requires": {
                "@babel/helper-annotate-as-pure": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-typeof-symbol": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typeof-symbol/-/plugin-transform-typeof-symbol-7.7.4.tgz",
                "integrity": "sha512-KQPUQ/7mqe2m0B8VecdyaW5XcQYaePyl9R7IsKd+irzj6jvbhoGnRE+M0aNkyAzI07VfUQ9266L5xMARitV3wg==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/plugin-transform-typescript": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.7.4.tgz",
                "integrity": "sha512-X8e3tcPEKnwwPVG+vP/vSqEShkwODOEeyQGod82qrIuidwIrfnsGn11qPM1jBLF4MqguTXXYzm58d0dY+/wdpg==",
                "requires": {
                "@babel/helper-create-class-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-syntax-typescript": "^7.7.4"
              }
            },
            "@babel/plugin-transform-unicode-regex": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/plugin-transform-unicode-regex/-/plugin-transform-unicode-regex-7.7.4.tgz",
                "integrity": "sha512-N77UUIV+WCvE+5yHw+oks3m18/umd7y392Zv7mYTpFqHtkpcc+QUz+gLJNTWVlWROIWeLqY0f3OjZxV5TcXnRw==",
                "requires": {
                "@babel/helper-create-regexp-features-plugin": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0"
              }
            },
            "@babel/preset-env": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/preset-env/-/preset-env-7.7.4.tgz",
                "integrity": "sha512-Dg+ciGJjwvC1NIe/DGblMbcGq1HOtKbw8RLl4nIjlfcILKEOkWT/vRqPpumswABEBVudii6dnVwrBtzD7ibm4g==",
                "requires": {
                "@babel/helper-module-imports": "^7.7.4",
                  "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-proposal-async-generator-functions": "^7.7.4",
                  "@babel/plugin-proposal-dynamic-import": "^7.7.4",
                  "@babel/plugin-proposal-json-strings": "^7.7.4",
                  "@babel/plugin-proposal-object-rest-spread": "^7.7.4",
                  "@babel/plugin-proposal-optional-catch-binding": "^7.7.4",
                  "@babel/plugin-proposal-unicode-property-regex": "^7.7.4",
                  "@babel/plugin-syntax-async-generators": "^7.7.4",
                  "@babel/plugin-syntax-dynamic-import": "^7.7.4",
                  "@babel/plugin-syntax-json-strings": "^7.7.4",
                  "@babel/plugin-syntax-object-rest-spread": "^7.7.4",
                  "@babel/plugin-syntax-optional-catch-binding": "^7.7.4",
                  "@babel/plugin-syntax-top-level-await": "^7.7.4",
                  "@babel/plugin-transform-arrow-functions": "^7.7.4",
                  "@babel/plugin-transform-async-to-generator": "^7.7.4",
                  "@babel/plugin-transform-block-scoped-functions": "^7.7.4",
                  "@babel/plugin-transform-block-scoping": "^7.7.4",
                  "@babel/plugin-transform-classes": "^7.7.4",
                  "@babel/plugin-transform-computed-properties": "^7.7.4",
                  "@babel/plugin-transform-destructuring": "^7.7.4",
                  "@babel/plugin-transform-dotall-regex": "^7.7.4",
                  "@babel/plugin-transform-duplicate-keys": "^7.7.4",
                  "@babel/plugin-transform-exponentiation-operator": "^7.7.4",
                  "@babel/plugin-transform-for-of": "^7.7.4",
                  "@babel/plugin-transform-function-name": "^7.7.4",
                  "@babel/plugin-transform-literals": "^7.7.4",
                  "@babel/plugin-transform-member-expression-literals": "^7.7.4",
                  "@babel/plugin-transform-modules-amd": "^7.7.4",
                  "@babel/plugin-transform-modules-commonjs": "^7.7.4",
                  "@babel/plugin-transform-modules-systemjs": "^7.7.4",
                  "@babel/plugin-transform-modules-umd": "^7.7.4",
                  "@babel/plugin-transform-named-capturing-groups-regex": "^7.7.4",
                  "@babel/plugin-transform-new-target": "^7.7.4",
                  "@babel/plugin-transform-object-super": "^7.7.4",
                  "@babel/plugin-transform-parameters": "^7.7.4",
                  "@babel/plugin-transform-property-literals": "^7.7.4",
                  "@babel/plugin-transform-regenerator": "^7.7.4",
                  "@babel/plugin-transform-reserved-words": "^7.7.4",
                  "@babel/plugin-transform-shorthand-properties": "^7.7.4",
                  "@babel/plugin-transform-spread": "^7.7.4",
                  "@babel/plugin-transform-sticky-regex": "^7.7.4",
                  "@babel/plugin-transform-template-literals": "^7.7.4",
                  "@babel/plugin-transform-typeof-symbol": "^7.7.4",
                  "@babel/plugin-transform-unicode-regex": "^7.7.4",
                  "@babel/types": "^7.7.4",
                  "browserslist": "^4.6.0",
                  "core-js-compat": "^3.1.1",
                  "invariant": "^2.2.2",
                  "js-levenshtein": "^1.1.3",
                  "semver": "^5.5.0"
              }
            },
            "@babel/preset-react": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/preset-react/-/preset-react-7.7.4.tgz",
                "integrity": "sha512-j+vZtg0/8pQr1H8wKoaJyGL2IEk3rG/GIvua7Sec7meXVIvGycihlGMx5xcU00kqCJbwzHs18xTu3YfREOqQ+g==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-transform-react-display-name": "^7.7.4",
                  "@babel/plugin-transform-react-jsx": "^7.7.4",
                  "@babel/plugin-transform-react-jsx-self": "^7.7.4",
                  "@babel/plugin-transform-react-jsx-source": "^7.7.4"
              }
            },
            "@babel/preset-typescript": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.7.4.tgz",
                "integrity": "sha512-rqrjxfdiHPsnuPur0jKrIIGQCIgoTWMTjlbWE69G4QJ6TIOVnnRnIJhUxNTL/VwDmEAVX08Tq3B1nirer5341w==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "@babel/plugin-transform-typescript": "^7.7.4"
              }
            },
            "@babel/runtime": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.7.7.tgz",
                "integrity": "sha512-uCnC2JEVAu8AKB5do1WRIsvrdJ0flYx/A/9f/6chdacnEZ7LmavjdsDXr5ksYBegxtuTPR5Va9/+13QF/kFkCA==",
                "requires": {
                "regenerator-runtime": "^0.13.2"
              },
              "dependencies": {
                "regenerator-runtime": {
                  "version": "0.13.3",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.3.tgz",
                    "integrity": "sha512-naKIZz2GQ8JWh///G7L3X6LaQUAMp2lvb1rvwwsURe/VXwD6VMfr+/1NuNw3ag8v2kY1aQ/go5SNn79O9JU7yw=="
                }
              }
            },
            "@babel/runtime-corejs3": {
              "version": "7.7.7",
                "resolved": "https://registry.npmjs.org/@babel/runtime-corejs3/-/runtime-corejs3-7.7.7.tgz",
                "integrity": "sha512-kr3W3Fw8mB/CTru2M5zIRQZZgC/9zOxNSoJ/tVCzjPt3H1/p5uuGbz6WwmaQy/TLQcW31rUhUUWKY28sXFRelA==",
                "requires": {
                "core-js-pure": "^3.0.0",
                  "regenerator-runtime": "^0.13.2"
              },
              "dependencies": {
                "regenerator-runtime": {
                  "version": "0.13.3",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.3.tgz",
                    "integrity": "sha512-naKIZz2GQ8JWh///G7L3X6LaQUAMp2lvb1rvwwsURe/VXwD6VMfr+/1NuNw3ag8v2kY1aQ/go5SNn79O9JU7yw=="
                }
              }
            },
            "@babel/template": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.7.4.tgz",
                "integrity": "sha512-qUzihgVPguAzXCK7WXw8pqs6cEwi54s3E+HrejlkuWO6ivMKx9hZl3Y2fSXp9i5HgyWmj7RKP+ulaYnKM4yYxw==",
                "requires": {
                "@babel/code-frame": "^7.0.0",
                  "@babel/parser": "^7.7.4",
                  "@babel/types": "^7.7.4"
              }
            },
            "@babel/traverse": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.7.4.tgz",
                "integrity": "sha512-P1L58hQyupn8+ezVA2z5KBm4/Zr4lCC8dwKCMYzsa5jFMDMQAzaBNy9W5VjB+KAmBjb40U7a/H6ao+Xo+9saIw==",
                "requires": {
                "@babel/code-frame": "^7.5.5",
                  "@babel/generator": "^7.7.4",
                  "@babel/helper-function-name": "^7.7.4",
                  "@babel/helper-split-export-declaration": "^7.7.4",
                  "@babel/parser": "^7.7.4",
                  "@babel/types": "^7.7.4",
                  "debug": "^4.1.0",
                  "globals": "^11.1.0",
                  "lodash": "^4.17.13"
              },
              "dependencies": {
                "@babel/code-frame": {
                  "version": "7.5.5",
                    "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.5.5.tgz",
                    "integrity": "sha512-27d4lZoomVyo51VegxI20xZPuSHusqbQag/ztrBC7wegWoQ1nLREPVSKSW8byhTlzTKyNE4ifaTA6lCp7JjpFw==",
                    "requires": {
                    "@babel/highlight": "^7.0.0"
                  }
                },
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                }
              }
            },
            "@babel/types": {
              "version": "7.7.4",
                "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.7.4.tgz",
                "integrity": "sha512-cz5Ji23KCi4T+YIE/BolWosrJuSmoZeN1EFnRtBwF+KKLi8GG/Z2c2hOJJeCXPk4mwk4QFvTmwIodJowXgttRA==",
                "requires": {
                "esutils": "^2.0.2",
                  "lodash": "^4.17.13",
                  "to-fast-properties": "^2.0.0"
              }
            },
            "@cnakazawa/watch": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/@cnakazawa/watch/-/watch-1.0.3.tgz",
                "integrity": "sha512-r5160ogAvGyHsal38Kux7YYtodEKOj89RGb28ht1jh3SJb08VwRwAKKJL0bGb04Zd/3r9FL3BFIc3bBidYffCA==",
                "requires": {
                "exec-sh": "^0.3.2",
                  "minimist": "^1.2.0"
              }
            },
            "@csstools/convert-colors": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/@csstools/convert-colors/-/convert-colors-1.4.0.tgz",
                "integrity": "sha512-5a6wqoJV/xEdbRNKVo6I4hO3VjyDq//8q2f9I6PBAvMesJHFauXDorcNCsr9RzvsZnaWi5NYCcfyqP1QeFHFbw=="
            },
            "@csstools/normalize.css": {
              "version": "10.1.0",
                "resolved": "https://registry.npmjs.org/@csstools/normalize.css/-/normalize.css-10.1.0.tgz",
                "integrity": "sha512-ij4wRiunFfaJxjB0BdrYHIH8FxBJpOwNPhhAcunlmPdXudL1WQV1qoP9un6JsEBAgQH+7UXyyjh0g7jTxXK6tg=="
            },
            "@emotion/is-prop-valid": {
              "version": "0.8.6",
                "resolved": "https://registry.npmjs.org/@emotion/is-prop-valid/-/is-prop-valid-0.8.6.tgz",
                "integrity": "sha512-mnZMho3Sq8BfzkYYRVc8ilQTnc8U02Ytp6J1AwM6taQStZ3AhsEJBX2LzhA/LJirNCwM2VtHL3VFIZ+sNJUgUQ==",
                "requires": {
                "@emotion/memoize": "0.7.4"
              }
            },
            "@emotion/memoize": {
              "version": "0.7.4",
                "resolved": "https://registry.npmjs.org/@emotion/memoize/-/memoize-0.7.4.tgz",
                "integrity": "sha512-Ja/Vfqe3HpuzRsG1oBtWTHk2PGZ7GR+2Vz5iYGelAw8dx32K0y7PjVuxK6z1nMpZOqAFsRUPCkK1YjJ56qJlgw=="
            },
            "@emotion/unitless": {
              "version": "0.7.5",
                "resolved": "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.7.5.tgz",
                "integrity": "sha512-OWORNpfjMsSSUBVrRBVGECkhWcULOAJz9ZW8uK9qgxD+87M7jHRcvh/A96XXNhXTLmKcoYSQtBEX7lHMO7YRwg=="
            },
            "@hapi/address": {
              "version": "2.1.4",
                "resolved": "https://registry.npmjs.org/@hapi/address/-/address-2.1.4.tgz",
                "integrity": "sha512-QD1PhQk+s31P1ixsX0H0Suoupp3VMXzIVMSwobR3F3MSUO2YCV0B7xqLcUw/Bh8yuvd3LhpyqLQWTNcRmp6IdQ=="
            },
            "@hapi/bourne": {
              "version": "1.3.2",
                "resolved": "https://registry.npmjs.org/@hapi/bourne/-/bourne-1.3.2.tgz",
                "integrity": "sha512-1dVNHT76Uu5N3eJNTYcvxee+jzX4Z9lfciqRRHCU27ihbUcYi+iSc2iml5Ke1LXe1SyJCLA0+14Jh4tXJgOppA=="
            },
            "@hapi/hoek": {
              "version": "8.5.0",
                "resolved": "https://registry.npmjs.org/@hapi/hoek/-/hoek-8.5.0.tgz",
                "integrity": "sha512-7XYT10CZfPsH7j9F1Jmg1+d0ezOux2oM2GfArAzLwWe4mE2Dr3hVjsAL6+TFY49RRJlCdJDMw3nJsLFroTc8Kw=="
            },
            "@hapi/joi": {
              "version": "15.1.1",
                "resolved": "https://registry.npmjs.org/@hapi/joi/-/joi-15.1.1.tgz",
                "integrity": "sha512-entf8ZMOK8sc+8YfeOlM8pCfg3b5+WZIKBfUaaJT8UsjAAPjartzxIYm3TIbjvA4u+u++KbcXD38k682nVHDAQ==",
                "requires": {
                "@hapi/address": "2.x.x",
                  "@hapi/bourne": "1.x.x",
                  "@hapi/hoek": "8.x.x",
                  "@hapi/topo": "3.x.x"
              }
            },
            "@hapi/topo": {
              "version": "3.1.6",
                "resolved": "https://registry.npmjs.org/@hapi/topo/-/topo-3.1.6.tgz",
                "integrity": "sha512-tAag0jEcjwH+P2quUfipd7liWCNX2F8NvYjQp2wtInsZxnMlypdw0FtAOLxtvvkO+GSRRbmNi8m/5y42PQJYCQ==",
                "requires": {
                "@hapi/hoek": "^8.3.0"
              }
            },
            "@jest/console": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/console/-/console-24.9.0.tgz",
                "integrity": "sha512-Zuj6b8TnKXi3q4ymac8EQfc3ea/uhLeCGThFqXeC8H9/raaH8ARPUTdId+XyGd03Z4In0/VjD2OYFcBF09fNLQ==",
                "requires": {
                "@jest/source-map": "^24.9.0",
                  "chalk": "^2.0.1",
                  "slash": "^2.0.0"
              }
            },
            "@jest/core": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/core/-/core-24.9.0.tgz",
                "integrity": "sha512-Fogg3s4wlAr1VX7q+rhV9RVnUv5tD7VuWfYy1+whMiWUrvl7U3QJSJyWcDio9Lq2prqYsZaeTv2Rz24pWGkJ2A==",
                "requires": {
                "@jest/console": "^24.7.1",
                  "@jest/reporters": "^24.9.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/transform": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "ansi-escapes": "^3.0.0",
                  "chalk": "^2.0.1",
                  "exit": "^0.1.2",
                  "graceful-fs": "^4.1.15",
                  "jest-changed-files": "^24.9.0",
                  "jest-config": "^24.9.0",
                  "jest-haste-map": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-regex-util": "^24.3.0",
                  "jest-resolve": "^24.9.0",
                  "jest-resolve-dependencies": "^24.9.0",
                  "jest-runner": "^24.9.0",
                  "jest-runtime": "^24.9.0",
                  "jest-snapshot": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-validate": "^24.9.0",
                  "jest-watcher": "^24.9.0",
                  "micromatch": "^3.1.10",
                  "p-each-series": "^1.0.0",
                  "realpath-native": "^1.1.0",
                  "rimraf": "^2.5.4",
                  "slash": "^2.0.0",
                  "strip-ansi": "^5.0.0"
              }
            },
            "@jest/environment": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/environment/-/environment-24.9.0.tgz",
                "integrity": "sha512-5A1QluTPhvdIPFYnO3sZC3smkNeXPVELz7ikPbhUj0bQjB07EoE9qtLrem14ZUYWdVayYbsjVwIiL4WBIMV4aQ==",
                "requires": {
                "@jest/fake-timers": "^24.9.0",
                  "@jest/transform": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "jest-mock": "^24.9.0"
              }
            },
            "@jest/fake-timers": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/fake-timers/-/fake-timers-24.9.0.tgz",
                "integrity": "sha512-eWQcNa2YSwzXWIMC5KufBh3oWRIijrQFROsIqt6v/NS9Io/gknw1jsAC9c+ih/RQX4A3O7SeWAhQeN0goKhT9A==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-mock": "^24.9.0"
              }
            },
            "@jest/reporters": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/reporters/-/reporters-24.9.0.tgz",
                "integrity": "sha512-mu4X0yjaHrffOsWmVLzitKmmmWSQ3GGuefgNscUSWNiUNcEOSEQk9k3pERKEQVBb0Cnn88+UESIsZEMH3o88Gw==",
                "requires": {
                "@jest/environment": "^24.9.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/transform": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "chalk": "^2.0.1",
                  "exit": "^0.1.2",
                  "glob": "^7.1.2",
                  "istanbul-lib-coverage": "^2.0.2",
                  "istanbul-lib-instrument": "^3.0.1",
                  "istanbul-lib-report": "^2.0.4",
                  "istanbul-lib-source-maps": "^3.0.1",
                  "istanbul-reports": "^2.2.6",
                  "jest-haste-map": "^24.9.0",
                  "jest-resolve": "^24.9.0",
                  "jest-runtime": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-worker": "^24.6.0",
                  "node-notifier": "^5.4.2",
                  "slash": "^2.0.0",
                  "source-map": "^0.6.0",
                  "string-length": "^2.0.0"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "@jest/source-map": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/source-map/-/source-map-24.9.0.tgz",
                "integrity": "sha512-/Xw7xGlsZb4MJzNDgB7PW5crou5JqWiBQaz6xyPd3ArOg2nfn/PunV8+olXbbEZzNl591o5rWKE9BRDaFAuIBg==",
                "requires": {
                "callsites": "^3.0.0",
                  "graceful-fs": "^4.1.15",
                  "source-map": "^0.6.0"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "@jest/test-result": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/test-result/-/test-result-24.9.0.tgz",
                "integrity": "sha512-XEFrHbBonBJ8dGp2JmF8kP/nQI/ImPpygKHwQ/SY+es59Z3L5PI4Qb9TQQMAEeYsThG1xF0k6tmG0tIKATNiiA==",
                "requires": {
                "@jest/console": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "@types/istanbul-lib-coverage": "^2.0.0"
              }
            },
            "@jest/test-sequencer": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/test-sequencer/-/test-sequencer-24.9.0.tgz",
                "integrity": "sha512-6qqsU4o0kW1dvA95qfNog8v8gkRN9ph6Lz7r96IvZpHdNipP2cBcb07J1Z45mz/VIS01OHJ3pY8T5fUY38tg4A==",
                "requires": {
                "@jest/test-result": "^24.9.0",
                  "jest-haste-map": "^24.9.0",
                  "jest-runner": "^24.9.0",
                  "jest-runtime": "^24.9.0"
              }
            },
            "@jest/transform": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/transform/-/transform-24.9.0.tgz",
                "integrity": "sha512-TcQUmyNRxV94S0QpMOnZl0++6RMiqpbH/ZMccFB/amku6Uwvyb1cjYX7xkp5nGNkbX4QPH/FcB6q1HBTHynLmQ==",
                "requires": {
                "@babel/core": "^7.1.0",
                  "@jest/types": "^24.9.0",
                  "babel-plugin-istanbul": "^5.1.0",
                  "chalk": "^2.0.1",
                  "convert-source-map": "^1.4.0",
                  "fast-json-stable-stringify": "^2.0.0",
                  "graceful-fs": "^4.1.15",
                  "jest-haste-map": "^24.9.0",
                  "jest-regex-util": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "micromatch": "^3.1.10",
                  "pirates": "^4.0.1",
                  "realpath-native": "^1.1.0",
                  "slash": "^2.0.0",
                  "source-map": "^0.6.1",
                  "write-file-atomic": "2.4.1"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "@jest/types": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/@jest/types/-/types-24.9.0.tgz",
                "integrity": "sha512-XKK7ze1apu5JWQ5eZjHITP66AX+QsLlbaJRBGYr8pNzwcAE2JVkwnf0yqjHTsDRcjR0mujy/NmZMXw5kl+kGBw==",
                "requires": {
                "@types/istanbul-lib-coverage": "^2.0.0",
                  "@types/istanbul-reports": "^1.1.1",
                  "@types/yargs": "^13.0.0"
              }
            },
            "@mrmlnc/readdir-enhanced": {
              "version": "2.2.1",
                "resolved": "https://registry.npmjs.org/@mrmlnc/readdir-enhanced/-/readdir-enhanced-2.2.1.tgz",
                "integrity": "sha512-bPHp6Ji8b41szTOcaP63VlnbbO5Ny6dwAATtY6JTjh5N2OLrb5Qk/Th5cRkRQhkWCt+EJsYrNB0MiL+Gpn6e3g==",
                "requires": {
                "call-me-maybe": "^1.0.1",
                  "glob-to-regexp": "^0.3.0"
              }
            },
            "@nodelib/fs.stat": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-1.1.3.tgz",
                "integrity": "sha512-shAmDyaQC4H92APFoIaVDHCx5bStIocgvbwQyxPRrbUY20V1EYTbSDchWbuwlMG3V17cprZhA6+78JfB+3DTPw=="
            },
            "@svgr/babel-plugin-add-jsx-attribute": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-add-jsx-attribute/-/babel-plugin-add-jsx-attribute-4.2.0.tgz",
                "integrity": "sha512-j7KnilGyZzYr/jhcrSYS3FGWMZVaqyCG0vzMCwzvei0coIkczuYMcniK07nI0aHJINciujjH11T72ICW5eL5Ig=="
            },
            "@svgr/babel-plugin-remove-jsx-attribute": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-remove-jsx-attribute/-/babel-plugin-remove-jsx-attribute-4.2.0.tgz",
                "integrity": "sha512-3XHLtJ+HbRCH4n28S7y/yZoEQnRpl0tvTZQsHqvaeNXPra+6vE5tbRliH3ox1yZYPCxrlqaJT/Mg+75GpDKlvQ=="
            },
            "@svgr/babel-plugin-remove-jsx-empty-expression": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-remove-jsx-empty-expression/-/babel-plugin-remove-jsx-empty-expression-4.2.0.tgz",
                "integrity": "sha512-yTr2iLdf6oEuUE9MsRdvt0NmdpMBAkgK8Bjhl6epb+eQWk6abBaX3d65UZ3E3FWaOwePyUgNyNCMVG61gGCQ7w=="
            },
            "@svgr/babel-plugin-replace-jsx-attribute-value": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-replace-jsx-attribute-value/-/babel-plugin-replace-jsx-attribute-value-4.2.0.tgz",
                "integrity": "sha512-U9m870Kqm0ko8beHawRXLGLvSi/ZMrl89gJ5BNcT452fAjtF2p4uRzXkdzvGJJJYBgx7BmqlDjBN/eCp5AAX2w=="
            },
            "@svgr/babel-plugin-svg-dynamic-title": {
              "version": "4.3.3",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-svg-dynamic-title/-/babel-plugin-svg-dynamic-title-4.3.3.tgz",
                "integrity": "sha512-w3Be6xUNdwgParsvxkkeZb545VhXEwjGMwExMVBIdPQJeyMQHqm9Msnb2a1teHBqUYL66qtwfhNkbj1iarCG7w=="
            },
            "@svgr/babel-plugin-svg-em-dimensions": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-svg-em-dimensions/-/babel-plugin-svg-em-dimensions-4.2.0.tgz",
                "integrity": "sha512-C0Uy+BHolCHGOZ8Dnr1zXy/KgpBOkEUYY9kI/HseHVPeMbluaX3CijJr7D4C5uR8zrc1T64nnq/k63ydQuGt4w=="
            },
            "@svgr/babel-plugin-transform-react-native-svg": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-transform-react-native-svg/-/babel-plugin-transform-react-native-svg-4.2.0.tgz",
                "integrity": "sha512-7YvynOpZDpCOUoIVlaaOUU87J4Z6RdD6spYN4eUb5tfPoKGSF9OG2NuhgYnq4jSkAxcpMaXWPf1cePkzmqTPNw=="
            },
            "@svgr/babel-plugin-transform-svg-component": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/@svgr/babel-plugin-transform-svg-component/-/babel-plugin-transform-svg-component-4.2.0.tgz",
                "integrity": "sha512-hYfYuZhQPCBVotABsXKSCfel2slf/yvJY8heTVX1PCTaq/IgASq1IyxPPKJ0chWREEKewIU/JMSsIGBtK1KKxw=="
            },
            "@svgr/babel-preset": {
              "version": "4.3.3",
                "resolved": "https://registry.npmjs.org/@svgr/babel-preset/-/babel-preset-4.3.3.tgz",
                "integrity": "sha512-6PG80tdz4eAlYUN3g5GZiUjg2FMcp+Wn6rtnz5WJG9ITGEF1pmFdzq02597Hn0OmnQuCVaBYQE1OVFAnwOl+0A==",
                "requires": {
                "@svgr/babel-plugin-add-jsx-attribute": "^4.2.0",
                  "@svgr/babel-plugin-remove-jsx-attribute": "^4.2.0",
                  "@svgr/babel-plugin-remove-jsx-empty-expression": "^4.2.0",
                  "@svgr/babel-plugin-replace-jsx-attribute-value": "^4.2.0",
                  "@svgr/babel-plugin-svg-dynamic-title": "^4.3.3",
                  "@svgr/babel-plugin-svg-em-dimensions": "^4.2.0",
                  "@svgr/babel-plugin-transform-react-native-svg": "^4.2.0",
                  "@svgr/babel-plugin-transform-svg-component": "^4.2.0"
              }
            },
            "@svgr/core": {
              "version": "4.3.3",
                "resolved": "https://registry.npmjs.org/@svgr/core/-/core-4.3.3.tgz",
                "integrity": "sha512-qNuGF1QON1626UCaZamWt5yedpgOytvLj5BQZe2j1k1B8DUG4OyugZyfEwBeXozCUwhLEpsrgPrE+eCu4fY17w==",
                "requires": {
                "@svgr/plugin-jsx": "^4.3.3",
                  "camelcase": "^5.3.1",
                  "cosmiconfig": "^5.2.1"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                }
              }
            },
            "@svgr/hast-util-to-babel-ast": {
              "version": "4.3.2",
                "resolved": "https://registry.npmjs.org/@svgr/hast-util-to-babel-ast/-/hast-util-to-babel-ast-4.3.2.tgz",
                "integrity": "sha512-JioXclZGhFIDL3ddn4Kiq8qEqYM2PyDKV0aYno8+IXTLuYt6TOgHUbUAAFvqtb0Xn37NwP0BTHglejFoYr8RZg==",
                "requires": {
                "@babel/types": "^7.4.4"
              }
            },
            "@svgr/plugin-jsx": {
              "version": "4.3.3",
                "resolved": "https://registry.npmjs.org/@svgr/plugin-jsx/-/plugin-jsx-4.3.3.tgz",
                "integrity": "sha512-cLOCSpNWQnDB1/v+SUENHH7a0XY09bfuMKdq9+gYvtuwzC2rU4I0wKGFEp1i24holdQdwodCtDQdFtJiTCWc+w==",
                "requires": {
                "@babel/core": "^7.4.5",
                  "@svgr/babel-preset": "^4.3.3",
                  "@svgr/hast-util-to-babel-ast": "^4.3.2",
                  "svg-parser": "^2.0.0"
              }
            },
            "@svgr/plugin-svgo": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/@svgr/plugin-svgo/-/plugin-svgo-4.3.1.tgz",
                "integrity": "sha512-PrMtEDUWjX3Ea65JsVCwTIXuSqa3CG9px+DluF1/eo9mlDrgrtFE7NE/DjdhjJgSM9wenlVBzkzneSIUgfUI/w==",
                "requires": {
                "cosmiconfig": "^5.2.1",
                  "merge-deep": "^3.0.2",
                  "svgo": "^1.2.2"
              }
            },
            "@svgr/webpack": {
              "version": "4.3.3",
                "resolved": "https://registry.npmjs.org/@svgr/webpack/-/webpack-4.3.3.tgz",
                "integrity": "sha512-bjnWolZ6KVsHhgyCoYRFmbd26p8XVbulCzSG53BDQqAr+JOAderYK7CuYrB3bDjHJuF6LJ7Wrr42+goLRV9qIg==",
                "requires": {
                "@babel/core": "^7.4.5",
                  "@babel/plugin-transform-react-constant-elements": "^7.0.0",
                  "@babel/preset-env": "^7.4.5",
                  "@babel/preset-react": "^7.0.0",
                  "@svgr/core": "^4.3.3",
                  "@svgr/plugin-jsx": "^4.3.3",
                  "@svgr/plugin-svgo": "^4.3.1",
                  "loader-utils": "^1.2.3"
              }
            },
            "@tanem/svg-injector": {
              "version": "8.0.38",
                "resolved": "https://registry.npmjs.org/@tanem/svg-injector/-/svg-injector-8.0.38.tgz",
                "integrity": "sha512-fDWVX0pk4b83W8pcf4E58iSsvIUpGVLOqaYszh9YfNQyq8u5mPSaNF4KSTOxgeK8TdSN1Z7wn9kyUGJaZA9OMg==",
                "requires": {
                "@babel/runtime": "^7.7.7"
              }
            },
            "@types/babel__core": {
              "version": "7.1.3",
                "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.1.3.tgz",
                "integrity": "sha512-8fBo0UR2CcwWxeX7WIIgJ7lXjasFxoYgRnFHUj+hRvKkpiBJbxhdAPTCY6/ZKM0uxANFVzt4yObSLuTiTnazDA==",
                "requires": {
                "@babel/parser": "^7.1.0",
                  "@babel/types": "^7.0.0",
                  "@types/babel__generator": "*",
                  "@types/babel__template": "*",
                  "@types/babel__traverse": "*"
              }
            },
            "@types/babel__generator": {
              "version": "7.6.1",
                "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.6.1.tgz",
                "integrity": "sha512-bBKm+2VPJcMRVwNhxKu8W+5/zT7pwNEqeokFOmbvVSqGzFneNxYcEBro9Ac7/N9tlsaPYnZLK8J1LWKkMsLAew==",
                "requires": {
                "@babel/types": "^7.0.0"
              }
            },
            "@types/babel__template": {
              "version": "7.0.2",
                "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.0.2.tgz",
                "integrity": "sha512-/K6zCpeW7Imzgab2bLkLEbz0+1JlFSrUMdw7KoIIu+IUdu51GWaBZpd3y1VXGVXzynvGa4DaIaxNZHiON3GXUg==",
                "requires": {
                "@babel/parser": "^7.1.0",
                  "@babel/types": "^7.0.0"
              }
            },
            "@types/babel__traverse": {
              "version": "7.0.8",
                "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.0.8.tgz",
                "integrity": "sha512-yGeB2dHEdvxjP0y4UbRtQaSkXJ9649fYCmIdRoul5kfAoGCwxuCbMhag0k3RPfnuh9kPGm8x89btcfDEXdVWGw==",
                "requires": {
                "@babel/types": "^7.3.0"
              }
            },
            "@types/eslint-visitor-keys": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/@types/eslint-visitor-keys/-/eslint-visitor-keys-1.0.0.tgz",
                "integrity": "sha512-OCutwjDZ4aFS6PB1UZ988C4YgwlBHJd6wCeQqaLdmadZ/7e+w79+hbMUFC1QXDNCmdyoRfAFdm0RypzwR+Qpag=="
            },
            "@types/events": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/@types/events/-/events-3.0.0.tgz",
                "integrity": "sha512-EaObqwIvayI5a8dCzhFrjKzVwKLxjoG9T6Ppd5CEo07LRKfQ8Yokw54r5+Wq7FaBQ+yXRvQAYPrHwya1/UFt9g=="
            },
            "@types/glob": {
              "version": "7.1.1",
                "resolved": "https://registry.npmjs.org/@types/glob/-/glob-7.1.1.tgz",
                "integrity": "sha512-1Bh06cbWJUHMC97acuD6UMG29nMt0Aqz1vF3guLfG+kHHJhy3AyohZFFxYk2f7Q1SQIrNwvncxAE0N/9s70F2w==",
                "requires": {
                "@types/events": "*",
                  "@types/minimatch": "*",
                  "@types/node": "*"
              }
            },
            "@types/istanbul-lib-coverage": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/@types/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.1.tgz",
                "integrity": "sha512-hRJD2ahnnpLgsj6KWMYSrmXkM3rm2Dl1qkx6IOFD5FnuNPXJIG5L0dhgKXCYTRMGzU4n0wImQ/xfmRc4POUFlg=="
            },
            "@types/istanbul-lib-report": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/@types/istanbul-lib-report/-/istanbul-lib-report-1.1.1.tgz",
                "integrity": "sha512-3BUTyMzbZa2DtDI2BkERNC6jJw2Mr2Y0oGI7mRxYNBPxppbtEK1F66u3bKwU2g+wxwWI7PAoRpJnOY1grJqzHg==",
                "requires": {
                "@types/istanbul-lib-coverage": "*"
              }
            },
            "@types/istanbul-reports": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/@types/istanbul-reports/-/istanbul-reports-1.1.1.tgz",
                "integrity": "sha512-UpYjBi8xefVChsCoBpKShdxTllC9pwISirfoZsUa2AAdQg/Jd2KQGtSbw+ya7GPo7x/wAPlH6JBhKhAsXUEZNA==",
                "requires": {
                "@types/istanbul-lib-coverage": "*",
                  "@types/istanbul-lib-report": "*"
              }
            },
            "@types/json-schema": {
              "version": "7.0.4",
                "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.4.tgz",
                "integrity": "sha512-8+KAKzEvSUdeo+kmqnKrqgeE+LcA0tjYWFY7RPProVYwnqDjukzO+3b6dLD56rYX5TdWejnEOLJYOIeh4CXKuA=="
            },
            "@types/minimatch": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/@types/minimatch/-/minimatch-3.0.3.tgz",
                "integrity": "sha512-tHq6qdbT9U1IRSGf14CL0pUlULksvY9OZ+5eEgl1N7t+OA3tGvNpxJCzuKQlsNgCVwbAs670L1vcVQi8j9HjnA=="
            },
            "@types/node": {
              "version": "13.1.6",
                "resolved": "https://registry.npmjs.org/@types/node/-/node-13.1.6.tgz",
                "integrity": "sha512-Jg1F+bmxcpENHP23sVKkNuU3uaxPnsBMW0cLjleiikFKomJQbsn0Cqk2yDvQArqzZN6ABfBkZ0To7pQ8sLdWDg=="
            },
            "@types/parse-json": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/@types/parse-json/-/parse-json-4.0.0.tgz",
                "integrity": "sha512-//oorEZjL6sbPcKUaCdIGlIUeH26mgzimjBB77G6XRgnDl/L5wOnpyBGRe/Mmf5CVW3PwEBE1NjiMZ/ssFh4wA=="
            },
            "@types/prop-types": {
              "version": "15.7.3",
                "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.3.tgz",
                "integrity": "sha512-KfRL3PuHmqQLOG+2tGpRO26Ctg+Cq1E01D2DMriKEATHgWLfeNDmq9e29Q9WIky0dQ3NPkd1mzYH8Lm936Z9qw=="
            },
            "@types/q": {
              "version": "1.5.2",
                "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.2.tgz",
                "integrity": "sha512-ce5d3q03Ex0sy4R14722Rmt6MT07Ua+k4FwDfdcToYJcMKNtRVQvJ6JCAPdAmAnbRb6CsX6aYb9m96NGod9uTw=="
            },
            "@types/react": {
              "version": "16.9.17",
                "resolved": "https://registry.npmjs.org/@types/react/-/react-16.9.17.tgz",
                "integrity": "sha512-UP27In4fp4sWF5JgyV6pwVPAQM83Fj76JOcg02X5BZcpSu5Wx+fP9RMqc2v0ssBoQIFvD5JdKY41gjJJKmw6Bg==",
                "requires": {
                "@types/prop-types": "*",
                  "csstype": "^2.2.0"
              }
            },
            "@types/react-slick": {
              "version": "0.23.4",
                "resolved": "https://registry.npmjs.org/@types/react-slick/-/react-slick-0.23.4.tgz",
                "integrity": "sha512-vXoIy4GUfB7/YgqubR4H7RALo+pRdMYCeLgWwV3MPwl5pggTlEkFBTF19R7u+LJc85uMqC7RfsbkqPLMQ4ab+A==",
                "requires": {
                "@types/react": "*"
              }
            },
            "@types/stack-utils": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/@types/stack-utils/-/stack-utils-1.0.1.tgz",
                "integrity": "sha512-l42BggppR6zLmpfU6fq9HEa2oGPEI8yrSPL3GITjfRInppYFahObbIQOQK3UGxEnyQpltZLaPe75046NOZQikw=="
            },
            "@types/yargs": {
              "version": "13.0.5",
                "resolved": "https://registry.npmjs.org/@types/yargs/-/yargs-13.0.5.tgz",
                "integrity": "sha512-CF/+sxTO7FOwbIRL4wMv0ZYLCRfMid2HQpzDRyViH7kSpfoAFiMdGqKIxb1PxWfjtQXQhnQuD33lvRHNwr809Q==",
                "requires": {
                "@types/yargs-parser": "*"
              }
            },
            "@types/yargs-parser": {
              "version": "13.1.0",
                "resolved": "https://registry.npmjs.org/@types/yargs-parser/-/yargs-parser-13.1.0.tgz",
                "integrity": "sha512-gCubfBUZ6KxzoibJ+SCUc/57Ms1jz5NjHe4+dI2krNmU5zCPAphyLJYyTOg06ueIyfj+SaCUqmzun7ImlxDcKg=="
            },
            "@typescript-eslint/eslint-plugin": {
              "version": "2.15.0",
                "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-2.15.0.tgz",
                "integrity": "sha512-XRJFznI5v4K1WvIrWmjFjBAdQWaUTz4xJEdqR7+wAFsv6Q9dP3mOlE6BMNT3pdlp9eF1+bC5m5LZTmLMqffCVw==",
                "requires": {
                "@typescript-eslint/experimental-utils": "2.15.0",
                  "eslint-utils": "^1.4.3",
                  "functional-red-black-tree": "^1.0.1",
                  "regexpp": "^3.0.0",
                  "tsutils": "^3.17.1"
              },
              "dependencies": {
                "eslint-utils": {
                  "version": "1.4.3",
                    "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-1.4.3.tgz",
                    "integrity": "sha512-fbBN5W2xdY45KulGXmLHZ3c3FHfVYmKg0IrAKGOkT/464PQsx2UeIzfz1RmEci+KLm1bBaAzZAh8+/E+XAeZ8Q==",
                    "requires": {
                    "eslint-visitor-keys": "^1.1.0"
                  }
                },
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                },
                "regexpp": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/regexpp/-/regexpp-3.0.0.tgz",
                    "integrity": "sha512-Z+hNr7RAVWxznLPuA7DIh8UNX1j9CDrUQxskw9IrBE1Dxue2lyXT+shqEIeLUjrokxIP8CMy1WkjgG3rTsd5/g=="
                }
              }
            },
            "@typescript-eslint/experimental-utils": {
              "version": "2.15.0",
                "resolved": "https://registry.npmjs.org/@typescript-eslint/experimental-utils/-/experimental-utils-2.15.0.tgz",
                "integrity": "sha512-Qkxu5zndY5hqlcQkmA88gfLvqQulMpX/TN91XC7OuXsRf4XG5xLGie0sbpX97o/oeccjeZYRMipIsjKk/tjDHA==",
                "requires": {
                "@types/json-schema": "^7.0.3",
                  "@typescript-eslint/typescript-estree": "2.15.0",
                  "eslint-scope": "^5.0.0"
              },
              "dependencies": {
                "eslint-scope": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.0.0.tgz",
                    "integrity": "sha512-oYrhJW7S0bxAFDvWqzvMPRm6pcgcnWc4QnofCAqRTRfQC0JcwenzGglTtsLyIuuWFfkqDG9vz67cnttSd53djw==",
                    "requires": {
                    "esrecurse": "^4.1.0",
                      "estraverse": "^4.1.1"
                  }
                }
              }
            },
            "@typescript-eslint/parser": {
              "version": "2.15.0",
                "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-2.15.0.tgz",
                "integrity": "sha512-6iSgQsqAYTaHw59t0tdjzZJluRAjswdGltzKEdLtcJOxR2UVTPHYvZRqkAVGCkaMVb6Fpa60NnuozNCvsSpA9g==",
                "requires": {
                "@types/eslint-visitor-keys": "^1.0.0",
                  "@typescript-eslint/experimental-utils": "2.15.0",
                  "@typescript-eslint/typescript-estree": "2.15.0",
                  "eslint-visitor-keys": "^1.1.0"
              },
              "dependencies": {
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                }
              }
            },
            "@typescript-eslint/typescript-estree": {
              "version": "2.15.0",
                "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-2.15.0.tgz",
                "integrity": "sha512-L6Pog+w3VZzXkAdyqA0VlwybF8WcwZX+mufso86CMxSdWmcizJ38lgBdpqTbc9bo92iyi0rOvmATKiwl+amjxg==",
                "requires": {
                "debug": "^4.1.1",
                  "eslint-visitor-keys": "^1.1.0",
                  "glob": "^7.1.6",
                  "is-glob": "^4.0.1",
                  "lodash.unescape": "4.0.1",
                  "semver": "^6.3.0",
                  "tsutils": "^3.17.1"
              },
              "dependencies": {
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                },
                "glob": {
                  "version": "7.1.6",
                    "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
                    "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
                    "requires": {
                    "fs.realpath": "^1.0.0",
                      "inflight": "^1.0.4",
                      "inherits": "2",
                      "minimatch": "^3.0.4",
                      "once": "^1.3.0",
                      "path-is-absolute": "^1.0.0"
                  }
                },
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                }
              }
            },
            "@webassemblyjs/ast": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.8.5.tgz",
                "integrity": "sha512-aJMfngIZ65+t71C3y2nBBg5FFG0Okt9m0XEgWZ7Ywgn1oMAT8cNwx00Uv1cQyHtidq0Xn94R4TAywO+LCQ+ZAQ==",
                "requires": {
                "@webassemblyjs/helper-module-context": "1.8.5",
                  "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
                  "@webassemblyjs/wast-parser": "1.8.5"
              }
            },
            "@webassemblyjs/floating-point-hex-parser": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.8.5.tgz",
                "integrity": "sha512-9p+79WHru1oqBh9ewP9zW95E3XAo+90oth7S5Re3eQnECGq59ly1Ri5tsIipKGpiStHsUYmY3zMLqtk3gTcOtQ=="
            },
            "@webassemblyjs/helper-api-error": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.8.5.tgz",
                "integrity": "sha512-Za/tnzsvnqdaSPOUXHyKJ2XI7PDX64kWtURyGiJJZKVEdFOsdKUCPTNEVFZq3zJ2R0G5wc2PZ5gvdTRFgm81zA=="
            },
            "@webassemblyjs/helper-buffer": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.8.5.tgz",
                "integrity": "sha512-Ri2R8nOS0U6G49Q86goFIPNgjyl6+oE1abW1pS84BuhP1Qcr5JqMwRFT3Ah3ADDDYGEgGs1iyb1DGX+kAi/c/Q=="
            },
            "@webassemblyjs/helper-code-frame": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.8.5.tgz",
                "integrity": "sha512-VQAadSubZIhNpH46IR3yWO4kZZjMxN1opDrzePLdVKAZ+DFjkGD/rf4v1jap744uPVU6yjL/smZbRIIJTOUnKQ==",
                "requires": {
                "@webassemblyjs/wast-printer": "1.8.5"
              }
            },
            "@webassemblyjs/helper-fsm": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.8.5.tgz",
                "integrity": "sha512-kRuX/saORcg8se/ft6Q2UbRpZwP4y7YrWsLXPbbmtepKr22i8Z4O3V5QE9DbZK908dh5Xya4Un57SDIKwB9eow=="
            },
            "@webassemblyjs/helper-module-context": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.8.5.tgz",
                "integrity": "sha512-/O1B236mN7UNEU4t9X7Pj38i4VoU8CcMHyy3l2cV/kIF4U5KoHXDVqcDuOs1ltkac90IM4vZdHc52t1x8Yfs3g==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "mamacro": "^0.0.3"
              }
            },
            "@webassemblyjs/helper-wasm-bytecode": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.8.5.tgz",
                "integrity": "sha512-Cu4YMYG3Ddl72CbmpjU/wbP6SACcOPVbHN1dI4VJNJVgFwaKf1ppeFJrwydOG3NDHxVGuCfPlLZNyEdIYlQ6QQ=="
            },
            "@webassemblyjs/helper-wasm-section": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.8.5.tgz",
                "integrity": "sha512-VV083zwR+VTrIWWtgIUpqfvVdK4ff38loRmrdDBgBT8ADXYsEZ5mPQ4Nde90N3UYatHdYoDIFb7oHzMncI02tA==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-buffer": "1.8.5",
                  "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
                  "@webassemblyjs/wasm-gen": "1.8.5"
              }
            },
            "@webassemblyjs/ieee754": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.8.5.tgz",
                "integrity": "sha512-aaCvQYrvKbY/n6wKHb/ylAJr27GglahUO89CcGXMItrOBqRarUMxWLJgxm9PJNuKULwN5n1csT9bYoMeZOGF3g==",
                "requires": {
                "@xtuc/ieee754": "^1.2.0"
              }
            },
            "@webassemblyjs/leb128": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.8.5.tgz",
                "integrity": "sha512-plYUuUwleLIziknvlP8VpTgO4kqNaH57Y3JnNa6DLpu/sGcP6hbVdfdX5aHAV716pQBKrfuU26BJK29qY37J7A==",
                "requires": {
                "@xtuc/long": "4.2.2"
              }
            },
            "@webassemblyjs/utf8": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.8.5.tgz",
                "integrity": "sha512-U7zgftmQriw37tfD934UNInokz6yTmn29inT2cAetAsaU9YeVCveWEwhKL1Mg4yS7q//NGdzy79nlXh3bT8Kjw=="
            },
            "@webassemblyjs/wasm-edit": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.8.5.tgz",
                "integrity": "sha512-A41EMy8MWw5yvqj7MQzkDjU29K7UJq1VrX2vWLzfpRHt3ISftOXqrtojn7nlPsZ9Ijhp5NwuODuycSvfAO/26Q==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-buffer": "1.8.5",
                  "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
                  "@webassemblyjs/helper-wasm-section": "1.8.5",
                  "@webassemblyjs/wasm-gen": "1.8.5",
                  "@webassemblyjs/wasm-opt": "1.8.5",
                  "@webassemblyjs/wasm-parser": "1.8.5",
                  "@webassemblyjs/wast-printer": "1.8.5"
              }
            },
            "@webassemblyjs/wasm-gen": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.8.5.tgz",
                "integrity": "sha512-BCZBT0LURC0CXDzj5FXSc2FPTsxwp3nWcqXQdOZE4U7h7i8FqtFK5Egia6f9raQLpEKT1VL7zr4r3+QX6zArWg==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
                  "@webassemblyjs/ieee754": "1.8.5",
                  "@webassemblyjs/leb128": "1.8.5",
                  "@webassemblyjs/utf8": "1.8.5"
              }
            },
            "@webassemblyjs/wasm-opt": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.8.5.tgz",
                "integrity": "sha512-HKo2mO/Uh9A6ojzu7cjslGaHaUU14LdLbGEKqTR7PBKwT6LdPtLLh9fPY33rmr5wcOMrsWDbbdCHq4hQUdd37Q==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-buffer": "1.8.5",
                  "@webassemblyjs/wasm-gen": "1.8.5",
                  "@webassemblyjs/wasm-parser": "1.8.5"
              }
            },
            "@webassemblyjs/wasm-parser": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.8.5.tgz",
                "integrity": "sha512-pi0SYE9T6tfcMkthwcgCpL0cM9nRYr6/6fjgDtL6q/ZqKHdMWvxitRi5JcZ7RI4SNJJYnYNaWy5UUrHQy998lw==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-api-error": "1.8.5",
                  "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
                  "@webassemblyjs/ieee754": "1.8.5",
                  "@webassemblyjs/leb128": "1.8.5",
                  "@webassemblyjs/utf8": "1.8.5"
              }
            },
            "@webassemblyjs/wast-parser": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.8.5.tgz",
                "integrity": "sha512-daXC1FyKWHF1i11obK086QRlsMsY4+tIOKgBqI1lxAnkp9xe9YMcgOxm9kLe+ttjs5aWV2KKE1TWJCN57/Btsg==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/floating-point-hex-parser": "1.8.5",
                  "@webassemblyjs/helper-api-error": "1.8.5",
                  "@webassemblyjs/helper-code-frame": "1.8.5",
                  "@webassemblyjs/helper-fsm": "1.8.5",
                  "@xtuc/long": "4.2.2"
              }
            },
            "@webassemblyjs/wast-printer": {
              "version": "1.8.5",
                "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.8.5.tgz",
                "integrity": "sha512-w0U0pD4EhlnvRyeJzBqaVSJAo9w/ce7/WPogeXLzGkO6hzhr4GnQIZ4W4uUt5b9ooAaXPtnXlj0gzsXEOUNYMg==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/wast-parser": "1.8.5",
                  "@xtuc/long": "4.2.2"
              }
            },
            "@xtuc/ieee754": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
                "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA=="
            },
            "@xtuc/long": {
              "version": "4.2.2",
                "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
                "integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ=="
            },
            "abab": {
              "version": "2.0.3",
                "resolved": "https://registry.npmjs.org/abab/-/abab-2.0.3.tgz",
                "integrity": "sha512-tsFzPpcttalNjFBCFMqsKYQcWxxen1pgJR56by//QwvJc4/OUS3kPOOttx2tSIfjsylB0pYu7f5D3K1RCxUnUg=="
            },
            "abbrev": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.1.1.tgz",
                "integrity": "sha512-nne9/IiQ/hzIhY6pdDnbBtz7DjPTKrY00P/zvPSm5pOFkl6xuGrGnXn/VtTNNfNtAfZ9/1RtehkszU9qcTii0Q=="
            },
            "accepts": {
              "version": "1.3.7",
                "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.7.tgz",
                "integrity": "sha512-Il80Qs2WjYlJIBNzNkK6KYqlVMTbZLXgHx2oT0pU/fjRHyEp+PEfEPY0R3WCwAGVOtauxh1hOxNgIf5bv7dQpA==",
                "requires": {
                "mime-types": "~2.1.24",
                  "negotiator": "0.6.2"
              }
            },
            "acorn": {
              "version": "6.1.1",
                "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.1.1.tgz",
                "integrity": "sha512-jPTiwtOxaHNaAPg/dmrJ/beuzLRnXtB0kQPQ8JpotKJgTB6rX6c8mlf315941pyjBSaPg8NHXS9fhP4u17DpGA=="
            },
            "acorn-globals": {
              "version": "4.3.4",
                "resolved": "https://registry.npmjs.org/acorn-globals/-/acorn-globals-4.3.4.tgz",
                "integrity": "sha512-clfQEh21R+D0leSbUdWf3OcfqyaCSAQ8Ryq00bofSekfr9W8u1jyYZo6ir0xu9Gtcf7BjcHJpnbZH7JOCpP60A==",
                "requires": {
                "acorn": "^6.0.1",
                  "acorn-walk": "^6.0.1"
              }
            },
            "acorn-jsx": {
              "version": "5.1.0",
                "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.1.0.tgz",
                "integrity": "sha512-tMUqwBWfLFbJbizRmEcWSLw6HnFzfdJs2sOJEOwwtVPMoH/0Ay+E703oZz78VSXZiiDcZrQ5XKjPIUQixhmgVw==",
                "dev": true
            },
            "acorn-walk": {
              "version": "6.2.0",
                "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-6.2.0.tgz",
                "integrity": "sha512-7evsyfH1cLOCdAzZAd43Cic04yKydNx0cF+7tiA19p1XnLLPU4dpCQOqpjqwokFe//vS0QqfqqjCS2JkiIs0cA=="
            },
            "add-dom-event-listener": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/add-dom-event-listener/-/add-dom-event-listener-1.1.0.tgz",
                "integrity": "sha512-WCxx1ixHT0GQU9hb0KI/mhgRQhnU+U3GvwY6ZvVjYq8rsihIGoaIOUbY0yMPBxLH5MDtr0kz3fisWGNcbWW7Jw==",
                "requires": {
                "object-assign": "4.x"
              }
            },
            "address": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/address/-/address-1.1.2.tgz",
                "integrity": "sha512-aT6camzM4xEA54YVJYSqxz1kv4IHnQZRtThJJHhUMRExaU5spC7jX5ugSwTaTgJliIgs4VhZOk7htClvQ/LmRA=="
            },
            "adjust-sourcemap-loader": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/adjust-sourcemap-loader/-/adjust-sourcemap-loader-2.0.0.tgz",
                "integrity": "sha512-4hFsTsn58+YjrU9qKzML2JSSDqKvN8mUGQ0nNIrfPi8hmIONT4L3uUaT6MKdMsZ9AjsU6D2xDkZxCkbQPxChrA==",
                "requires": {
                "assert": "1.4.1",
                  "camelcase": "5.0.0",
                  "loader-utils": "1.2.3",
                  "object-path": "0.11.4",
                  "regex-parser": "2.2.10"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.0.0.tgz",
                    "integrity": "sha512-faqwZqnWxbxn+F1d399ygeamQNy3lPp/H9H6rNrqYh4FSVCtcY+3cub1MxA8o9mDd55mM8Aghuu/kuyYA6VTsA=="
                }
              }
            },
            "aggregate-error": {
              "version": "3.0.1",
                "resolved": "https://registry.npmjs.org/aggregate-error/-/aggregate-error-3.0.1.tgz",
                "integrity": "sha512-quoaXsZ9/BLNae5yiNoUz+Nhkwz83GhWwtYFglcjEQB2NDHCIpApbqXxIFnm4Pq/Nvhrsq5sYJFyohrrxnTGAA==",
                "requires": {
                "clean-stack": "^2.0.0",
                  "indent-string": "^4.0.0"
              },
              "dependencies": {
                "indent-string": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-4.0.0.tgz",
                    "integrity": "sha512-EdDDZu4A2OyIK7Lr/2zG+w5jmbuk1DVBnEwREQvBzspBJkCEbRa8GxU1lghYcaGJCnRWibjDXlq779X1/y5xwg=="
                }
              }
            },
            "ajv": {
              "version": "6.10.0",
                "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.10.0.tgz",
                "integrity": "sha512-nffhOpkymDECQyR0mnsUtoCE8RlX38G0rYP+wgLWFyZuUyuuojSSvi/+euOiQBIn63whYwYVIIH1TvE3tu4OEg==",
                "requires": {
                "fast-deep-equal": "^2.0.1",
                  "fast-json-stable-stringify": "^2.0.0",
                  "json-schema-traverse": "^0.4.1",
                  "uri-js": "^4.2.2"
              }
            },
            "ajv-errors": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
                "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ=="
            },
            "ajv-keywords": {
              "version": "3.4.1",
                "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.4.1.tgz",
                "integrity": "sha512-RO1ibKvd27e6FEShVFfPALuHI3WjSVNeK5FIsmme/LYRNxjKuNj+Dt7bucLa6NdSv3JcVTyMlm9kGR84z1XpaQ=="
            },
            "alphanum-sort": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/alphanum-sort/-/alphanum-sort-1.0.2.tgz",
                "integrity": "sha1-l6ERlkmyEa0zaR2fn0hqjsn74KM="
            },
            "amdefine": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/amdefine/-/amdefine-1.0.1.tgz",
                "integrity": "sha1-SlKCrBZHKek2Gbz9OtFR+BfOkfU="
            },
            "ansi-colors": {
              "version": "3.2.4",
                "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.4.tgz",
                "integrity": "sha512-hHUXGagefjN2iRrID63xckIvotOXOojhQKWIPUZ4mNUZ9nLZW+7FMNoE1lOkEhNWYsx/7ysGIuJYCiMAA9FnrA=="
            },
            "ansi-escapes": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.1.0.tgz",
                "integrity": "sha512-UgAb8H9D41AQnu/PbWlCofQVcnV4Gs2bBJi9eZPxfU/hgglFh3SMDMENRIqdr7H6XFnXdoknctFByVsCOotTVw=="
            },
            "ansi-html": {
              "version": "0.0.7",
                "resolved": "https://registry.npmjs.org/ansi-html/-/ansi-html-0.0.7.tgz",
                "integrity": "sha1-gTWEAhliqenm/QOflA0S9WynhZ4="
            },
            "ansi-regex": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
                "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8="
            },
            "ansi-styles": {
              "version": "3.2.1",
                "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
                "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
                "requires": {
                "color-convert": "^1.9.0"
              }
            },
            "antd": {
              "version": "3.19.1",
                "resolved": "https://registry.npmjs.org/antd/-/antd-3.19.1.tgz",
                "integrity": "sha512-0Sl6zN11mC84V4/mIi8kKdTqsys8ttnuqRa+CdeyrX2ttIZ7xzpMxkaniI3H15YK9qmzRl9fbo05q3BItmZiCg==",
                "requires": {
                "@ant-design/create-react-context": "^0.2.4",
                  "@ant-design/icons": "~2.0.0",
                  "@ant-design/icons-react": "~2.0.0",
                  "@types/react-slick": "^0.23.3",
                  "array-tree-filter": "^2.1.0",
                  "babel-runtime": "6.x",
                  "classnames": "~2.2.6",
                  "copy-to-clipboard": "^3.0.8",
                  "css-animation": "^1.5.0",
                  "dom-closest": "^0.2.0",
                  "enquire.js": "^2.1.6",
                  "lodash": "^4.17.11",
                  "moment": "^2.24.0",
                  "omit.js": "^1.0.0",
                  "prop-types": "^15.6.2",
                  "raf": "^3.4.0",
                  "rc-animate": "^2.5.4",
                  "rc-calendar": "~9.14.0",
                  "rc-cascader": "~0.17.0",
                  "rc-checkbox": "~2.1.5",
                  "rc-collapse": "~1.11.1",
                  "rc-dialog": "~7.4.0",
                  "rc-drawer": "~1.9.3",
                  "rc-dropdown": "~2.4.1",
                  "rc-editor-mention": "^1.1.7",
                  "rc-form": "^2.4.0",
                  "rc-input-number": "~4.4.0",
                  "rc-mentions": "~0.3.1",
                  "rc-menu": "~7.4.12",
                  "rc-notification": "~3.3.0",
                  "rc-pagination": "~1.20.1",
                  "rc-progress": "~2.3.0",
                  "rc-rate": "~2.5.0",
                  "rc-select": "~9.1.0",
                  "rc-slider": "~8.6.5",
                  "rc-steps": "~3.4.1",
                  "rc-switch": "~1.9.0",
                  "rc-table": "~6.5.0",
                  "rc-tabs": "~9.6.0",
                  "rc-time-picker": "~3.6.1",
                  "rc-tooltip": "~3.7.3",
                  "rc-tree": "~2.1.0",
                  "rc-tree-select": "~2.9.1",
                  "rc-trigger": "^2.6.2",
                  "rc-upload": "~2.6.0",
                  "rc-util": "^4.5.1",
                  "react-lazy-load": "^3.0.13",
                  "react-lifecycles-compat": "^3.0.4",
                  "react-slick": "~0.24.0",
                  "resize-observer-polyfill": "^1.5.0",
                  "shallowequal": "^1.1.0",
                  "warning": "~4.0.2"
              }
            },
            "antd-mask-input": {
              "version": "0.1.10",
                "resolved": "https://registry.npmjs.org/antd-mask-input/-/antd-mask-input-0.1.10.tgz",
                "integrity": "sha512-kwznYT43ZbCk0ncNbZBWFyfhZO6gdr3luYdo7f+IoykpcS5avneV5TSfawBka+H4YtkqgLSJ+pltR9z7vgyX3Q=="
            },
            "anymatch": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",
                "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",
                "requires": {
                "micromatch": "^3.1.4",
                  "normalize-path": "^2.1.1"
              }
            },
            "aproba": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
                "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw=="
            },
            "are-we-there-yet": {
              "version": "1.1.5",
                "resolved": "https://registry.npmjs.org/are-we-there-yet/-/are-we-there-yet-1.1.5.tgz",
                "integrity": "sha512-5hYdAkZlcG8tOLujVDTgCT+uPX0VnpAH28gWsLfzpXYm7wP6mp5Q/gYyR7YQ0cKVJcXJnl3j2kpBan13PtQf6w==",
                "requires": {
                "delegates": "^1.0.0",
                  "readable-stream": "^2.0.6"
              }
            },
            "argparse": {
              "version": "1.0.10",
                "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
                "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
                "requires": {
                "sprintf-js": "~1.0.2"
              }
            },
            "aria-query": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-3.0.0.tgz",
                "integrity": "sha1-ZbP8wcoRVajJrmTW7uKX8V1RM8w=",
                "requires": {
                "ast-types-flow": "0.0.7",
                  "commander": "^2.11.0"
              }
            },
            "arity-n": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/arity-n/-/arity-n-1.0.4.tgz",
                "integrity": "sha1-2edrEXM+CFacCEeuezmyhgswt0U="
            },
            "arr-diff": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
                "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA="
            },
            "arr-flatten": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
                "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg=="
            },
            "arr-union": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
                "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ="
            },
            "array-equal": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/array-equal/-/array-equal-1.0.0.tgz",
                "integrity": "sha1-jCpe8kcv2ep0KwTHenUJO6J1fJM="
            },
            "array-find-index": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/array-find-index/-/array-find-index-1.0.2.tgz",
                "integrity": "sha1-3wEKoSh+Fku9pvlyOwqWoexBh6E="
            },
            "array-flatten": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.2.tgz",
                "integrity": "sha512-hNfzcOV8W4NdualtqBFPyVO+54DSJuZGY9qT4pRroB6S9e3iiido2ISIC5h9R2sPJ8H3FHCIiEnsv1lPXO3KtQ=="
            },
            "array-includes": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.0.3.tgz",
                "integrity": "sha1-GEtI9i2S10UrsxsyMWXH+L0CJm0=",
                "requires": {
                "define-properties": "^1.1.2",
                  "es-abstract": "^1.7.0"
              }
            },
            "array-tree-filter": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/array-tree-filter/-/array-tree-filter-2.1.0.tgz",
                "integrity": "sha512-4ROwICNlNw/Hqa9v+rk5h22KjmzB1JGTMVKP2AKJBOCgb0yL0ASf0+YvCcLNNwquOHNX48jkeZIJ3a+oOQqKcw=="
            },
            "array-union": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
                "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
                "requires": {
                "array-uniq": "^1.0.1"
              }
            },
            "array-uniq": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
                "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY="
            },
            "array-unique": {
              "version": "0.3.2",
                "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
                "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg="
            },
            "array.prototype.flat": {
              "version": "1.2.3",
                "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.2.3.tgz",
                "integrity": "sha512-gBlRZV0VSmfPIeWfuuy56XZMvbVfbEUnOXUvt3F/eUUUSyzlgLxhEX4YAEpxNAogRGehPSnfXyPtYyKAhkzQhQ==",
                "dev": true,
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.17.0-next.1"
              },
              "dependencies": {
                "es-abstract": {
                  "version": "1.17.0",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.0.tgz",
                    "integrity": "sha512-yYkE07YF+6SIBmg1MsJ9dlub5L48Ek7X0qz+c/CPCHS9EBXfESorzng4cJQjJW5/pB6vDF41u7F8vUhLVDqIug==",
                    "dev": true,
                    "requires": {
                    "es-to-primitive": "^1.2.1",
                      "function-bind": "^1.1.1",
                      "has": "^1.0.3",
                      "has-symbols": "^1.0.1",
                      "is-callable": "^1.1.5",
                      "is-regex": "^1.0.5",
                      "object-inspect": "^1.7.0",
                      "object-keys": "^1.1.1",
                      "object.assign": "^4.1.0",
                      "string.prototype.trimleft": "^2.1.1",
                      "string.prototype.trimright": "^2.1.1"
                  }
                },
                "has-symbols": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
                    "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg==",
                    "dev": true
                },
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
                    "dev": true
                }
              }
            },
            "arrify": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
                "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0="
            },
            "asap": {
              "version": "2.0.6",
                "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",
                "integrity": "sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY="
            },
            "asn1": {
              "version": "0.2.4",
                "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
                "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
                "requires": {
                "safer-buffer": "~2.1.0"
              }
            },
            "asn1.js": {
              "version": "4.10.1",
                "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
                "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
                "requires": {
                "bn.js": "^4.0.0",
                  "inherits": "^2.0.1",
                  "minimalistic-assert": "^1.0.0"
              }
            },
            "assert": {
              "version": "1.4.1",
                "resolved": "https://registry.npmjs.org/assert/-/assert-1.4.1.tgz",
                "integrity": "sha1-mZEtWRg2tab1s0XA8H7vwI/GXZE=",
                "requires": {
                "util": "0.10.3"
              }
            },
            "assert-plus": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
                "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU="
            },
            "assign-symbols": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
                "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c="
            },
            "ast-types-flow": {
              "version": "0.0.7",
                "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.7.tgz",
                "integrity": "sha1-9wtzXGvKGlycItmCw+Oef+ujva0="
            },
            "astral-regex": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/astral-regex/-/astral-regex-1.0.0.tgz",
                "integrity": "sha512-+Ryf6g3BKoRc7jfp7ad8tM4TtMiaWvbF/1/sQcZPkkS7ag3D5nMBCe2UfOTONtAkaG0tO0ij3C5Lwmf1EiyjHg=="
            },
            "async": {
              "version": "2.6.3",
                "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
                "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
                "requires": {
                "lodash": "^4.17.14"
              }
            },
            "async-each": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.1.tgz",
                "integrity": "sha1-GdOGodntxufByF04iu28xW0zYC0="
            },
            "async-foreach": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/async-foreach/-/async-foreach-0.1.3.tgz",
                "integrity": "sha1-NhIfhFwFeBct5Bmpfb6x0W7DRUI="
            },
            "async-limiter": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.1.tgz",
                "integrity": "sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ=="
            },
            "async-validator": {
              "version": "1.11.5",
                "resolved": "https://registry.npmjs.org/async-validator/-/async-validator-1.11.5.tgz",
                "integrity": "sha512-XNtCsMAeAH1pdLMEg1z8/Bb3a8cdCbui9QbJATRFHHHW5kT6+NPI3zSVQUXgikTFITzsg+kYY5NTWhM2Orwt9w=="
            },
            "asynckit": {
              "version": "0.4.0",
                "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
                "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k="
            },
            "atob": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
                "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg=="
            },
            "autoprefixer": {
              "version": "9.7.3",
                "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-9.7.3.tgz",
                "integrity": "sha512-8T5Y1C5Iyj6PgkPSFd0ODvK9DIleuPKUPYniNxybS47g2k2wFgLZ46lGQHlBuGKIAEV8fbCDfKCCRS1tvOgc3Q==",
                "requires": {
                "browserslist": "^4.8.0",
                  "caniuse-lite": "^1.0.30001012",
                  "chalk": "^2.4.2",
                  "normalize-range": "^0.1.2",
                  "num2fraction": "^1.2.2",
                  "postcss": "^7.0.23",
                  "postcss-value-parser": "^4.0.2"
              },
              "dependencies": {
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  }
                }
              }
            },
            "aws-sign2": {
              "version": "0.7.0",
                "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
                "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg="
            },
            "aws4": {
              "version": "1.9.0",
                "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.9.0.tgz",
                "integrity": "sha512-Uvq6hVe90D0B2WEnUqtdgY1bATGz3mw33nH9Y+dmA+w5DHvUmBgkr5rM/KCHpCsiFNRUfokW/szpPPgMK2hm4A=="
            },
            "axios": {
              "version": "0.18.1",
                "resolved": "https://registry.npmjs.org/axios/-/axios-0.18.1.tgz",
                "integrity": "sha512-0BfJq4NSfQXd+SkFdrvFbG7addhYSBA2mQwISr46pD6E5iqkWg02RAs8vyTT/j0RTnoYmeXauBuSv1qKwR179g==",
                "requires": {
                "follow-redirects": "1.5.10",
                  "is-buffer": "^2.0.2"
              },
              "dependencies": {
                "is-buffer": {
                  "version": "2.0.4",
                    "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-2.0.4.tgz",
                    "integrity": "sha512-Kq1rokWXOPXWuaMAqZiJW4XxsmD9zGx9q4aePabbn3qCRGedtH7Cm+zV8WETitMfu1wdh+Rvd6w5egwSngUX2A=="
                }
              }
            },
            "axobject-query": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-2.1.1.tgz",
                "integrity": "sha512-lF98xa/yvy6j3fBHAgQXIYl+J4eZadOSqsPojemUqClzNbBV38wWGpUbQbVEyf4eUF5yF7eHmGgGA2JiHyjeqw==",
                "requires": {
                "@babel/runtime": "^7.7.4",
                  "@babel/runtime-corejs3": "^7.7.4"
              }
            },
            "babel-cli": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-cli/-/babel-cli-6.26.0.tgz",
                "integrity": "sha1-UCq1SHTX24itALiHoGODzgPQAvE=",
                "dev": true,
                "requires": {
                "babel-core": "^6.26.0",
                  "babel-polyfill": "^6.26.0",
                  "babel-register": "^6.26.0",
                  "babel-runtime": "^6.26.0",
                  "chokidar": "^1.6.1",
                  "commander": "^2.11.0",
                  "convert-source-map": "^1.5.0",
                  "fs-readdir-recursive": "^1.0.0",
                  "glob": "^7.1.2",
                  "lodash": "^4.17.4",
                  "output-file-sync": "^1.1.2",
                  "path-is-absolute": "^1.0.1",
                  "slash": "^1.0.0",
                  "source-map": "^0.5.6",
                  "v8flags": "^2.1.1"
              },
              "dependencies": {
                "anymatch": {
                  "version": "1.3.2",
                    "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-1.3.2.tgz",
                    "integrity": "sha512-0XNayC8lTHQ2OI8aljNCN3sSx6hsr/1+rlcDAotXJR7C1oZZHCNsfpbKwMjRA3Uqb5tF1Rae2oloTr4xpq+WjA==",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "micromatch": "^2.1.5",
                      "normalize-path": "^2.0.0"
                  }
                },
                "arr-diff": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-2.0.0.tgz",
                    "integrity": "sha1-jzuCf5Vai9ZpaX5KQlasPOrjVs8=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "arr-flatten": "^1.0.1"
                  }
                },
                "array-unique": {
                  "version": "0.2.1",
                    "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.2.1.tgz",
                    "integrity": "sha1-odl8yvy8JiXMcPrc6zalDFiwGlM=",
                    "dev": true,
                    "optional": true
                },
                "braces": {
                  "version": "1.8.5",
                    "resolved": "https://registry.npmjs.org/braces/-/braces-1.8.5.tgz",
                    "integrity": "sha1-uneWLhLf+WnWt2cR6RS3N4V79qc=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "expand-range": "^1.8.1",
                      "preserve": "^0.2.0",
                      "repeat-element": "^1.1.2"
                  }
                },
                "chokidar": {
                  "version": "1.7.0",
                    "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-1.7.0.tgz",
                    "integrity": "sha1-eY5ol3gVHIB2tLNg5e3SjNortGg=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "anymatch": "^1.3.0",
                      "async-each": "^1.0.0",
                      "fsevents": "^1.0.0",
                      "glob-parent": "^2.0.0",
                      "inherits": "^2.0.1",
                      "is-binary-path": "^1.0.0",
                      "is-glob": "^2.0.0",
                      "path-is-absolute": "^1.0.0",
                      "readdirp": "^2.0.0"
                  }
                },
                "expand-brackets": {
                  "version": "0.1.5",
                    "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-0.1.5.tgz",
                    "integrity": "sha1-3wcoTjQqgHzXM6xa9yQR5YHRF3s=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "is-posix-bracket": "^0.1.0"
                  }
                },
                "extglob": {
                  "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/extglob/-/extglob-0.3.2.tgz",
                    "integrity": "sha1-Lhj/PS9JqydlzskCPwEdqo2DSaE=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "is-extglob": "^1.0.0"
                  }
                },
                "fsevents": {
                  "version": "1.2.11",
                    "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.11.tgz",
                    "integrity": "sha512-+ux3lx6peh0BpvY0JebGyZoiR4D+oYzdPZMKJwkZ+sFkNJzpL7tXc/wehS49gUAxg3tmMHPHZkA8JU2rhhgDHw==",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "bindings": "^1.5.0",
                      "nan": "^2.12.1",
                      "node-pre-gyp": "*"
                  },
                  "dependencies": {
                    "abbrev": {
                      "version": "1.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "ansi-regex": {
                      "version": "2.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "aproba": {
                      "version": "1.2.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "are-we-there-yet": {
                      "version": "1.1.5",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "delegates": "^1.0.0",
                          "readable-stream": "^2.0.6"
                      }
                    },
                    "balanced-match": {
                      "version": "1.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "brace-expansion": {
                      "version": "1.1.11",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "balanced-match": "^1.0.0",
                          "concat-map": "0.0.1"
                      }
                    },
                    "chownr": {
                      "version": "1.1.3",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "code-point-at": {
                      "version": "1.1.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "concat-map": {
                      "version": "0.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "console-control-strings": {
                      "version": "1.1.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "core-util-is": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "debug": {
                      "version": "3.2.6",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "ms": "^2.1.1"
                      }
                    },
                    "deep-extend": {
                      "version": "0.6.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "delegates": {
                      "version": "1.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "detect-libc": {
                      "version": "1.0.3",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "fs-minipass": {
                      "version": "1.2.7",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.6.0"
                      }
                    },
                    "fs.realpath": {
                      "version": "1.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "gauge": {
                      "version": "2.7.4",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "aproba": "^1.0.3",
                          "console-control-strings": "^1.0.0",
                          "has-unicode": "^2.0.0",
                          "object-assign": "^4.1.0",
                          "signal-exit": "^3.0.0",
                          "string-width": "^1.0.1",
                          "strip-ansi": "^3.0.1",
                          "wide-align": "^1.1.0"
                      }
                    },
                    "glob": {
                      "version": "7.1.6",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "fs.realpath": "^1.0.0",
                          "inflight": "^1.0.4",
                          "inherits": "2",
                          "minimatch": "^3.0.4",
                          "once": "^1.3.0",
                          "path-is-absolute": "^1.0.0"
                      }
                    },
                    "has-unicode": {
                      "version": "2.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "iconv-lite": {
                      "version": "0.4.24",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "safer-buffer": ">= 2.1.2 < 3"
                      }
                    },
                    "ignore-walk": {
                      "version": "3.0.3",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "minimatch": "^3.0.4"
                      }
                    },
                    "inflight": {
                      "version": "1.0.6",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "once": "^1.3.0",
                          "wrappy": "1"
                      }
                    },
                    "inherits": {
                      "version": "2.0.4",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "ini": {
                      "version": "1.3.5",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "is-fullwidth-code-point": {
                      "version": "1.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "number-is-nan": "^1.0.0"
                      }
                    },
                    "isarray": {
                      "version": "1.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "minimatch": {
                      "version": "3.0.4",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "brace-expansion": "^1.1.7"
                      }
                    },
                    "minimist": {
                      "version": "0.0.8",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "minipass": {
                      "version": "2.9.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.0"
                      }
                    },
                    "minizlib": {
                      "version": "1.3.3",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.9.0"
                      }
                    },
                    "mkdirp": {
                      "version": "0.5.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "minimist": "0.0.8"
                      }
                    },
                    "ms": {
                      "version": "2.1.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "needle": {
                      "version": "2.4.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "debug": "^3.2.6",
                          "iconv-lite": "^0.4.4",
                          "sax": "^1.2.4"
                      }
                    },
                    "node-pre-gyp": {
                      "version": "0.14.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "detect-libc": "^1.0.2",
                          "mkdirp": "^0.5.1",
                          "needle": "^2.2.1",
                          "nopt": "^4.0.1",
                          "npm-packlist": "^1.1.6",
                          "npmlog": "^4.0.2",
                          "rc": "^1.2.7",
                          "rimraf": "^2.6.1",
                          "semver": "^5.3.0",
                          "tar": "^4.4.2"
                      }
                    },
                    "nopt": {
                      "version": "4.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "abbrev": "1",
                          "osenv": "^0.1.4"
                      }
                    },
                    "npm-bundled": {
                      "version": "1.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "npm-normalize-package-bin": "^1.0.1"
                      }
                    },
                    "npm-normalize-package-bin": {
                      "version": "1.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "npm-packlist": {
                      "version": "1.4.7",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "ignore-walk": "^3.0.1",
                          "npm-bundled": "^1.0.1"
                      }
                    },
                    "npmlog": {
                      "version": "4.1.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "are-we-there-yet": "~1.1.2",
                          "console-control-strings": "~1.1.0",
                          "gauge": "~2.7.3",
                          "set-blocking": "~2.0.0"
                      }
                    },
                    "number-is-nan": {
                      "version": "1.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "object-assign": {
                      "version": "4.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "once": {
                      "version": "1.4.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "wrappy": "1"
                      }
                    },
                    "os-homedir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "os-tmpdir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "osenv": {
                      "version": "0.1.5",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "os-homedir": "^1.0.0",
                          "os-tmpdir": "^1.0.0"
                      }
                    },
                    "path-is-absolute": {
                      "version": "1.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "process-nextick-args": {
                      "version": "2.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "rc": {
                      "version": "1.2.8",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "deep-extend": "^0.6.0",
                          "ini": "~1.3.0",
                          "minimist": "^1.2.0",
                          "strip-json-comments": "~2.0.1"
                      },
                      "dependencies": {
                        "minimist": {
                          "version": "1.2.0",
                            "bundled": true,
                            "dev": true,
                            "optional": true
                        }
                      }
                    },
                    "readable-stream": {
                      "version": "2.3.6",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "core-util-is": "~1.0.0",
                          "inherits": "~2.0.3",
                          "isarray": "~1.0.0",
                          "process-nextick-args": "~2.0.0",
                          "safe-buffer": "~5.1.1",
                          "string_decoder": "~1.1.1",
                          "util-deprecate": "~1.0.1"
                      }
                    },
                    "rimraf": {
                      "version": "2.7.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "glob": "^7.1.3"
                      }
                    },
                    "safe-buffer": {
                      "version": "5.1.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "safer-buffer": {
                      "version": "2.1.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "sax": {
                      "version": "1.2.4",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "semver": {
                      "version": "5.7.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "set-blocking": {
                      "version": "2.0.0",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "signal-exit": {
                      "version": "3.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "string-width": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "code-point-at": "^1.0.0",
                          "is-fullwidth-code-point": "^1.0.0",
                          "strip-ansi": "^3.0.0"
                      }
                    },
                    "string_decoder": {
                      "version": "1.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "~5.1.0"
                      }
                    },
                    "strip-ansi": {
                      "version": "3.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "ansi-regex": "^2.0.0"
                      }
                    },
                    "strip-json-comments": {
                      "version": "2.0.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "tar": {
                      "version": "4.4.13",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "chownr": "^1.1.1",
                          "fs-minipass": "^1.2.5",
                          "minipass": "^2.8.6",
                          "minizlib": "^1.2.1",
                          "mkdirp": "^0.5.0",
                          "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.3"
                      }
                    },
                    "util-deprecate": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "wide-align": {
                      "version": "1.1.3",
                        "bundled": true,
                        "dev": true,
                        "optional": true,
                        "requires": {
                        "string-width": "^1.0.2 || 2"
                      }
                    },
                    "wrappy": {
                      "version": "1.0.2",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    },
                    "yallist": {
                      "version": "3.1.1",
                        "bundled": true,
                        "dev": true,
                        "optional": true
                    }
                  }
                },
                "glob-parent": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
                    "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "is-glob": "^2.0.0"
                  }
                },
                "micromatch": {
                  "version": "2.3.11",
                    "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-2.3.11.tgz",
                    "integrity": "sha1-hmd8l9FyCzY0MdBNDRUpO9OMFWU=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "arr-diff": "^2.0.0",
                      "array-unique": "^0.2.1",
                      "braces": "^1.8.2",
                      "expand-brackets": "^0.1.4",
                      "extglob": "^0.3.1",
                      "filename-regex": "^2.0.0",
                      "is-extglob": "^1.0.0",
                      "is-glob": "^2.0.1",
                      "kind-of": "^3.0.2",
                      "normalize-path": "^2.0.1",
                      "object.omit": "^2.0.0",
                      "parse-glob": "^3.0.4",
                      "regex-cache": "^0.4.2"
                  }
                },
                "slash": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
                    "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU=",
                    "dev": true
                }
              }
            },
            "babel-code-frame": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-code-frame/-/babel-code-frame-6.26.0.tgz",
                "integrity": "sha1-Y/1D99weO7fONZR9uP42mj9Yx0s=",
                "requires": {
                "chalk": "^1.1.3",
                  "esutils": "^2.0.2",
                  "js-tokens": "^3.0.2"
              },
              "dependencies": {
                "ansi-styles": {
                  "version": "2.2.1",
                    "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
                    "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4="
                },
                "chalk": {
                  "version": "1.1.3",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
                    "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
                    "requires": {
                    "ansi-styles": "^2.2.1",
                      "escape-string-regexp": "^1.0.2",
                      "has-ansi": "^2.0.0",
                      "strip-ansi": "^3.0.0",
                      "supports-color": "^2.0.0"
                  }
                },
                "js-tokens": {
                  "version": "3.0.2",
                    "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-3.0.2.tgz",
                    "integrity": "sha1-mGbfOVECEw449/mWvOtlRDIJwls="
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                },
                "supports-color": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
                    "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc="
                }
              }
            },
            "babel-core": {
              "version": "6.26.3",
                "resolved": "https://registry.npmjs.org/babel-core/-/babel-core-6.26.3.tgz",
                "integrity": "sha512-6jyFLuDmeidKmUEb3NM+/yawG0M2bDZ9Z1qbZP59cyHLz8kYGKYwpJP0UwUKKUiTRNvxfLesJnTedqczP7cTDA==",
                "dev": true,
                "requires": {
                "babel-code-frame": "^6.26.0",
                  "babel-generator": "^6.26.0",
                  "babel-helpers": "^6.24.1",
                  "babel-messages": "^6.23.0",
                  "babel-register": "^6.26.0",
                  "babel-runtime": "^6.26.0",
                  "babel-template": "^6.26.0",
                  "babel-traverse": "^6.26.0",
                  "babel-types": "^6.26.0",
                  "babylon": "^6.18.0",
                  "convert-source-map": "^1.5.1",
                  "debug": "^2.6.9",
                  "json5": "^0.5.1",
                  "lodash": "^4.17.4",
                  "minimatch": "^3.0.4",
                  "path-is-absolute": "^1.0.1",
                  "private": "^0.1.8",
                  "slash": "^1.0.0",
                  "source-map": "^0.5.7"
              },
              "dependencies": {
                "json5": {
                  "version": "0.5.1",
                    "resolved": "https://registry.npmjs.org/json5/-/json5-0.5.1.tgz",
                    "integrity": "sha1-Hq3nrMASA0rYTiOWdn6tn6VJWCE=",
                    "dev": true
                },
                "slash": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
                    "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU=",
                    "dev": true
                }
              }
            },
            "babel-eslint": {
              "version": "10.0.3",
                "resolved": "https://registry.npmjs.org/babel-eslint/-/babel-eslint-10.0.3.tgz",
                "integrity": "sha512-z3U7eMY6r/3f3/JB9mTsLjyxrv0Yb1zb8PCWCLpguxfCzBIZUwy23R1t/XKewP+8mEN2Ck8Dtr4q20z6ce6SoA==",
                "requires": {
                "@babel/code-frame": "^7.0.0",
                  "@babel/parser": "^7.0.0",
                  "@babel/traverse": "^7.0.0",
                  "@babel/types": "^7.0.0",
                  "eslint-visitor-keys": "^1.0.0",
                  "resolve": "^1.12.0"
              },
              "dependencies": {
                "resolve": {
                  "version": "1.14.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.14.2.tgz",
                    "integrity": "sha512-EjlOBLBO1kxsUxsKjLt7TAECyKW6fOh1VRkykQkKGzcBbjjPIxBqGh0jf7GJ3k/f5mxMqW3htMD3WdTUVtW8HQ==",
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                }
              }
            },
            "babel-extract-comments": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/babel-extract-comments/-/babel-extract-comments-1.0.0.tgz",
                "integrity": "sha512-qWWzi4TlddohA91bFwgt6zO/J0X+io7Qp184Fw0m2JYRSTZnJbFR8+07KmzudHCZgOiKRCrjhylwv9Xd8gfhVQ==",
                "requires": {
                "babylon": "^6.18.0"
              }
            },
            "babel-generator": {
              "version": "6.26.1",
                "resolved": "https://registry.npmjs.org/babel-generator/-/babel-generator-6.26.1.tgz",
                "integrity": "sha512-HyfwY6ApZj7BYTcJURpM5tznulaBvyio7/0d4zFOeMPUmfxkCjHocCuoLa2SAGzBI8AREcH3eP3758F672DppA==",
                "dev": true,
                "requires": {
                "babel-messages": "^6.23.0",
                  "babel-runtime": "^6.26.0",
                  "babel-types": "^6.26.0",
                  "detect-indent": "^4.0.0",
                  "jsesc": "^1.3.0",
                  "lodash": "^4.17.4",
                  "source-map": "^0.5.7",
                  "trim-right": "^1.0.1"
              },
              "dependencies": {
                "jsesc": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-1.3.0.tgz",
                    "integrity": "sha1-RsP+yMGJKxKwgz25vHYiF226s0s=",
                    "dev": true
                }
              }
            },
            "babel-helpers": {
              "version": "6.24.1",
                "resolved": "https://registry.npmjs.org/babel-helpers/-/babel-helpers-6.24.1.tgz",
                "integrity": "sha1-NHHenK7DiOXIUOWX5Yom3fN2ArI=",
                "dev": true,
                "requires": {
                "babel-runtime": "^6.22.0",
                  "babel-template": "^6.24.1"
              }
            },
            "babel-jest": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/babel-jest/-/babel-jest-24.9.0.tgz",
                "integrity": "sha512-ntuddfyiN+EhMw58PTNL1ph4C9rECiQXjI4nMMBKBaNjXvqLdkXpPRcMSr4iyBrJg/+wz9brFUD6RhOAT6r4Iw==",
                "requires": {
                "@jest/transform": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "@types/babel__core": "^7.1.0",
                  "babel-plugin-istanbul": "^5.1.0",
                  "babel-preset-jest": "^24.9.0",
                  "chalk": "^2.4.2",
                  "slash": "^2.0.0"
              },
              "dependencies": {
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  }
                }
              }
            },
            "babel-loader": {
              "version": "8.0.6",
                "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-8.0.6.tgz",
                "integrity": "sha512-4BmWKtBOBm13uoUwd08UwjZlaw3O9GWf456R9j+5YykFZ6LUIjIKLc0zEZf+hauxPOJs96C8k6FvYD09vWzhYw==",
                "requires": {
                "find-cache-dir": "^2.0.0",
                  "loader-utils": "^1.0.2",
                  "mkdirp": "^0.5.1",
                  "pify": "^4.0.1"
              },
              "dependencies": {
                "pify": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
                    "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
                }
              }
            },
            "babel-messages": {
              "version": "6.23.0",
                "resolved": "https://registry.npmjs.org/babel-messages/-/babel-messages-6.23.0.tgz",
                "integrity": "sha1-8830cDhYA1sqKVHG7F7fbGLyYw4=",
                "dev": true,
                "requires": {
                "babel-runtime": "^6.22.0"
              }
            },
            "babel-plugin-dynamic-import-node": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-dynamic-import-node/-/babel-plugin-dynamic-import-node-2.3.0.tgz",
                "integrity": "sha512-o6qFkpeQEBxcqt0XYlWzAVxNCSCZdUgcR8IRlhD/8DylxjjO4foPcvTW0GGKa/cVt3rvxZ7o5ippJ+/0nvLhlQ==",
                "requires": {
                "object.assign": "^4.1.0"
              }
            },
            "babel-plugin-istanbul": {
              "version": "5.2.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-istanbul/-/babel-plugin-istanbul-5.2.0.tgz",
                "integrity": "sha512-5LphC0USA8t4i1zCtjbbNb6jJj/9+X6P37Qfirc/70EQ34xKlMW+a1RHGwxGI+SwWpNwZ27HqvzAobeqaXwiZw==",
                "requires": {
                "@babel/helper-plugin-utils": "^7.0.0",
                  "find-up": "^3.0.0",
                  "istanbul-lib-instrument": "^3.3.0",
                  "test-exclude": "^5.2.3"
              },
              "dependencies": {
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                }
              }
            },
            "babel-plugin-jest-hoist": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-jest-hoist/-/babel-plugin-jest-hoist-24.9.0.tgz",
                "integrity": "sha512-2EMA2P8Vp7lG0RAzr4HXqtYwacfMErOuv1U3wrvxHX6rD1sV6xS3WXG3r8TRQ2r6w8OhvSdWt+z41hQNwNm3Xw==",
                "requires": {
                "@types/babel__traverse": "^7.0.6"
              }
            },
            "babel-plugin-macros": {
              "version": "2.7.1",
                "resolved": "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-2.7.1.tgz",
                "integrity": "sha512-HNM284amlKSQ6FddI4jLXD+XTqF0cTYOe5uemOIZxHJHnamC+OhFQ57rMF9sgnYhkJQptVl9U1SKVZsV9/GLQQ==",
                "requires": {
                "@babel/runtime": "^7.7.2",
                  "cosmiconfig": "^6.0.0",
                  "resolve": "^1.12.0"
              },
              "dependencies": {
                "cosmiconfig": {
                  "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-6.0.0.tgz",
                    "integrity": "sha512-xb3ZL6+L8b9JLLCx3ZdoZy4+2ECphCMo2PwqgP1tlfVq6M6YReyzBJtvWWtbDSpNr9hn96pkCiZqUcFEc+54Qg==",
                    "requires": {
                    "@types/parse-json": "^4.0.0",
                      "import-fresh": "^3.1.0",
                      "parse-json": "^5.0.0",
                      "path-type": "^4.0.0",
                      "yaml": "^1.7.2"
                  }
                },
                "import-fresh": {
                  "version": "3.2.1",
                    "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.2.1.tgz",
                    "integrity": "sha512-6e1q1cnWP2RXD9/keSkxHScg508CdXqXWgWBaETNhyuBFz+kUZlKboh+ISK+bU++DmbHimVBrOz/zzPe0sZ3sQ==",
                    "requires": {
                    "parent-module": "^1.0.0",
                      "resolve-from": "^4.0.0"
                  }
                },
                "parse-json": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.0.0.tgz",
                    "integrity": "sha512-OOY5b7PAEFV0E2Fir1KOkxchnZNCdowAJgQ5NuxjpBKTRP3pQhwkrkxqQjeoKJ+fO7bCpmIZaogI4eZGDMEGOw==",
                    "requires": {
                    "@babel/code-frame": "^7.0.0",
                      "error-ex": "^1.3.1",
                      "json-parse-better-errors": "^1.0.1",
                      "lines-and-columns": "^1.1.6"
                  }
                },
                "path-type": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
                    "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw=="
                },
                "resolve": {
                  "version": "1.14.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.14.2.tgz",
                    "integrity": "sha512-EjlOBLBO1kxsUxsKjLt7TAECyKW6fOh1VRkykQkKGzcBbjjPIxBqGh0jf7GJ3k/f5mxMqW3htMD3WdTUVtW8HQ==",
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                },
                "resolve-from": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
                    "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="
                }
              }
            },
            "babel-plugin-named-asset-import": {
              "version": "0.3.5",
                "resolved": "https://registry.npmjs.org/babel-plugin-named-asset-import/-/babel-plugin-named-asset-import-0.3.5.tgz",
                "integrity": "sha512-sGhfINU+AuMw9oFAdIn/nD5sem3pn/WgxAfDZ//Q3CnF+5uaho7C7shh2rKLk6sKE/XkfmyibghocwKdVjLIKg=="
            },
            "babel-plugin-styled-components": {
              "version": "1.10.6",
                "resolved": "https://registry.npmjs.org/babel-plugin-styled-components/-/babel-plugin-styled-components-1.10.6.tgz",
                "integrity": "sha512-gyQj/Zf1kQti66100PhrCRjI5ldjaze9O0M3emXRPAN80Zsf8+e1thpTpaXJXVHXtaM4/+dJEgZHyS9Its+8SA==",
                "requires": {
                "@babel/helper-annotate-as-pure": "^7.0.0",
                  "@babel/helper-module-imports": "^7.0.0",
                  "babel-plugin-syntax-jsx": "^6.18.0",
                  "lodash": "^4.17.11"
              }
            },
            "babel-plugin-syntax-jsx": {
              "version": "6.18.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-syntax-jsx/-/babel-plugin-syntax-jsx-6.18.0.tgz",
                "integrity": "sha1-CvMqmm4Tyno/1QaeYtew9Y0NiUY="
            },
            "babel-plugin-syntax-object-rest-spread": {
              "version": "6.13.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-syntax-object-rest-spread/-/babel-plugin-syntax-object-rest-spread-6.13.0.tgz",
                "integrity": "sha1-/WU28rzhODb/o6VFjEkDpZe7O/U="
            },
            "babel-plugin-transform-object-rest-spread": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-plugin-transform-object-rest-spread/-/babel-plugin-transform-object-rest-spread-6.26.0.tgz",
                "integrity": "sha1-DzZpLVD+9rfi1LOsFHgTepY7ewY=",
                "requires": {
                "babel-plugin-syntax-object-rest-spread": "^6.8.0",
                  "babel-runtime": "^6.26.0"
              }
            },
            "babel-plugin-transform-react-remove-prop-types": {
              "version": "0.4.24",
                "resolved": "https://registry.npmjs.org/babel-plugin-transform-react-remove-prop-types/-/babel-plugin-transform-react-remove-prop-types-0.4.24.tgz",
                "integrity": "sha512-eqj0hVcJUR57/Ug2zE1Yswsw4LhuqqHhD+8v120T1cl3kjg76QwtyBrdIk4WVwK+lAhBJVYCd/v+4nc4y+8JsA=="
            },
            "babel-polyfill": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-polyfill/-/babel-polyfill-6.26.0.tgz",
                "integrity": "sha1-N5k3q8Z9eJWXCtxiHyhM2WbPIVM=",
                "dev": true,
                "requires": {
                "babel-runtime": "^6.26.0",
                  "core-js": "^2.5.0",
                  "regenerator-runtime": "^0.10.5"
              },
              "dependencies": {
                "regenerator-runtime": {
                  "version": "0.10.5",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.10.5.tgz",
                    "integrity": "sha1-M2w+/BIgrc7dosn6tntaeVWjNlg=",
                    "dev": true
                }
              }
            },
            "babel-preset-jest": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/babel-preset-jest/-/babel-preset-jest-24.9.0.tgz",
                "integrity": "sha512-izTUuhE4TMfTRPF92fFwD2QfdXaZW08qvWTFCI51V8rW5x00UuPgc3ajRoWofXOuxjfcOM5zzSYsQS3H8KGCAg==",
                "requires": {
                "@babel/plugin-syntax-object-rest-spread": "^7.0.0",
                  "babel-plugin-jest-hoist": "^24.9.0"
              }
            },
            "babel-preset-react-app": {
              "version": "9.1.0",
                "resolved": "https://registry.npmjs.org/babel-preset-react-app/-/babel-preset-react-app-9.1.0.tgz",
                "integrity": "sha512-0qMOv/pCcCQWxX1eNyKD9GlzZTdzZIK/Pq3O6TGe65tZSJTSplw1pFlaPujm0GjBj4g3GeCQbP08vvzlH7OGHg==",
                "requires": {
                "@babel/core": "7.7.4",
                  "@babel/plugin-proposal-class-properties": "7.7.4",
                  "@babel/plugin-proposal-decorators": "7.7.4",
                  "@babel/plugin-proposal-nullish-coalescing-operator": "7.7.4",
                  "@babel/plugin-proposal-numeric-separator": "7.7.4",
                  "@babel/plugin-proposal-object-rest-spread": "7.7.4",
                  "@babel/plugin-proposal-optional-chaining": "7.7.4",
                  "@babel/plugin-syntax-dynamic-import": "7.7.4",
                  "@babel/plugin-transform-destructuring": "7.7.4",
                  "@babel/plugin-transform-flow-strip-types": "7.7.4",
                  "@babel/plugin-transform-react-display-name": "7.7.4",
                  "@babel/plugin-transform-runtime": "7.7.4",
                  "@babel/preset-env": "7.7.4",
                  "@babel/preset-react": "7.7.4",
                  "@babel/preset-typescript": "7.7.4",
                  "@babel/runtime": "7.7.4",
                  "babel-plugin-dynamic-import-node": "2.3.0",
                  "babel-plugin-macros": "2.7.1",
                  "babel-plugin-transform-react-remove-prop-types": "0.4.24"
              },
              "dependencies": {
                "@babel/plugin-proposal-object-rest-spread": {
                  "version": "7.7.4",
                    "resolved": "https://registry.npmjs.org/@babel/plugin-proposal-object-rest-spread/-/plugin-proposal-object-rest-spread-7.7.4.tgz",
                    "integrity": "sha512-rnpnZR3/iWKmiQyJ3LKJpSwLDcX/nSXhdLk4Aq/tXOApIvyu7qoabrige0ylsAJffaUC51WiBu209Q0U+86OWQ==",
                    "requires": {
                    "@babel/helper-plugin-utils": "^7.0.0",
                      "@babel/plugin-syntax-object-rest-spread": "^7.7.4"
                  }
                },
                "@babel/runtime": {
                  "version": "7.7.4",
                    "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.7.4.tgz",
                    "integrity": "sha512-r24eVUUr0QqNZa+qrImUk8fn5SPhHq+IfYvIoIMg0do3GdK9sMdiLKP3GYVVaxpPKORgm8KRKaNTEhAjgIpLMw==",
                    "requires": {
                    "regenerator-runtime": "^0.13.2"
                  }
                },
                "regenerator-runtime": {
                  "version": "0.13.3",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.3.tgz",
                    "integrity": "sha512-naKIZz2GQ8JWh///G7L3X6LaQUAMp2lvb1rvwwsURe/VXwD6VMfr+/1NuNw3ag8v2kY1aQ/go5SNn79O9JU7yw=="
                }
              }
            },
            "babel-register": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-register/-/babel-register-6.26.0.tgz",
                "integrity": "sha1-btAhFz4vy0htestFxgCahW9kcHE=",
                "dev": true,
                "requires": {
                "babel-core": "^6.26.0",
                  "babel-runtime": "^6.26.0",
                  "core-js": "^2.5.0",
                  "home-or-tmp": "^2.0.0",
                  "lodash": "^4.17.4",
                  "mkdirp": "^0.5.1",
                  "source-map-support": "^0.4.15"
              }
            },
            "babel-runtime": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-runtime/-/babel-runtime-6.26.0.tgz",
                "integrity": "sha1-llxwWGaOgrVde/4E/yM3vItWR/4=",
                "requires": {
                "core-js": "^2.4.0",
                  "regenerator-runtime": "^0.11.0"
              }
            },
            "babel-template": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-template/-/babel-template-6.26.0.tgz",
                "integrity": "sha1-3gPi0WOWsGn0bdn/+FIfsaDjXgI=",
                "dev": true,
                "requires": {
                "babel-runtime": "^6.26.0",
                  "babel-traverse": "^6.26.0",
                  "babel-types": "^6.26.0",
                  "babylon": "^6.18.0",
                  "lodash": "^4.17.4"
              }
            },
            "babel-traverse": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-traverse/-/babel-traverse-6.26.0.tgz",
                "integrity": "sha1-RqnL1+3MYsjlwGTi0tjQ9ANXZu4=",
                "dev": true,
                "requires": {
                "babel-code-frame": "^6.26.0",
                  "babel-messages": "^6.23.0",
                  "babel-runtime": "^6.26.0",
                  "babel-types": "^6.26.0",
                  "babylon": "^6.18.0",
                  "debug": "^2.6.8",
                  "globals": "^9.18.0",
                  "invariant": "^2.2.2",
                  "lodash": "^4.17.4"
              },
              "dependencies": {
                "globals": {
                  "version": "9.18.0",
                    "resolved": "https://registry.npmjs.org/globals/-/globals-9.18.0.tgz",
                    "integrity": "sha512-S0nG3CLEQiY/ILxqtztTWH/3iRRdyBLw6KMDxnKMchrtbj2OFmehVh0WUCfW3DUrIgx/qFrJPICrq4Z4sTR9UQ==",
                    "dev": true
                }
              }
            },
            "babel-types": {
              "version": "6.26.0",
                "resolved": "https://registry.npmjs.org/babel-types/-/babel-types-6.26.0.tgz",
                "integrity": "sha1-o7Bz+Uq0nrb6Vc1lInozQ4BjJJc=",
                "dev": true,
                "requires": {
                "babel-runtime": "^6.26.0",
                  "esutils": "^2.0.2",
                  "lodash": "^4.17.4",
                  "to-fast-properties": "^1.0.3"
              },
              "dependencies": {
                "to-fast-properties": {
                  "version": "1.0.3",
                    "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-1.0.3.tgz",
                    "integrity": "sha1-uDVx+k2MJbguIxsG46MFXeTKGkc=",
                    "dev": true
                }
              }
            },
            "babylon": {
              "version": "6.18.0",
                "resolved": "https://registry.npmjs.org/babylon/-/babylon-6.18.0.tgz",
                "integrity": "sha512-q/UEjfGJ2Cm3oKV71DJz9d25TPnq5rhBVL2Q4fA5wcC3jcrdn7+SssEybFIxwAvvP+YCsCYNKughoF33GxgycQ=="
            },
            "balanced-match": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
                "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c="
            },
            "base": {
              "version": "0.11.2",
                "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
                "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
                "requires": {
                "cache-base": "^1.0.1",
                  "class-utils": "^0.3.5",
                  "component-emitter": "^1.2.1",
                  "define-property": "^1.0.0",
                  "isobject": "^3.0.1",
                  "mixin-deep": "^1.2.0",
                  "pascalcase": "^0.1.1"
              },
              "dependencies": {
                "define-property": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                    "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                    "requires": {
                    "is-descriptor": "^1.0.0"
                  }
                },
                "is-accessor-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-data-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-descriptor": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                    "is-accessor-descriptor": "^1.0.0",
                      "is-data-descriptor": "^1.0.0",
                      "kind-of": "^6.0.2"
                  }
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "base64-js": {
              "version": "1.3.1",
                "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
                "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
            },
            "batch": {
              "version": "0.6.1",
                "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
                "integrity": "sha1-3DQxT05nkxgJP8dgJyUl+UvyXBY="
            },
            "bcrypt-pbkdf": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
                "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
                "requires": {
                "tweetnacl": "^0.14.3"
              }
            },
            "big.js": {
              "version": "5.2.2",
                "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
                "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ=="
            },
            "binary-extensions": {
              "version": "1.13.1",
                "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
                "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw=="
            },
            "bindings": {
              "version": "1.5.0",
                "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
                "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
                "optional": true,
                "requires": {
                "file-uri-to-path": "1.0.0"
              }
            },
            "block-stream": {
              "version": "0.0.9",
                "resolved": "https://registry.npmjs.org/block-stream/-/block-stream-0.0.9.tgz",
                "integrity": "sha1-E+v+d4oDIFz+A3UUgeu0szAMEmo=",
                "requires": {
                "inherits": "~2.0.0"
              }
            },
            "bluebird": {
              "version": "3.7.2",
                "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
                "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg=="
            },
            "bn.js": {
              "version": "4.11.8",
                "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.8.tgz",
                "integrity": "sha512-ItfYfPLkWHUjckQCk8xC+LwxgK8NYcXywGigJgSwOP8Y2iyWT4f2vsZnoOXTTbo+o5yXmIUJ4gn5538SO5S3gA=="
            },
            "body-parser": {
              "version": "1.19.0",
                "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.19.0.tgz",
                "integrity": "sha512-dhEPs72UPbDnAQJ9ZKMNTP6ptJaionhP5cBb541nXPlW60Jepo9RV/a4fX4XWW9CuFNK22krhrj1+rgzifNCsw==",
                "requires": {
                "bytes": "3.1.0",
                  "content-type": "~1.0.4",
                  "debug": "2.6.9",
                  "depd": "~1.1.2",
                  "http-errors": "1.7.2",
                  "iconv-lite": "0.4.24",
                  "on-finished": "~2.3.0",
                  "qs": "6.7.0",
                  "raw-body": "2.4.0",
                  "type-is": "~1.6.17"
              },
              "dependencies": {
                "bytes": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.0.tgz",
                    "integrity": "sha512-zauLjrfCG+xvoyaqLoV8bLVXXNGC4JqlxFCutSDWA6fJrTo2ZuvLYTqZ7aHBLZSMOopbzwv8f+wZcVzfVTI2Dg=="
                },
                "qs": {
                  "version": "6.7.0",
                    "resolved": "https://registry.npmjs.org/qs/-/qs-6.7.0.tgz",
                    "integrity": "sha512-VCdBRNFTX1fyE7Nb6FYoURo/SPe62QCaAyzJvUjwRaIsc+NePBEniHlvxFmmX56+HZphIGtV0XeCirBtpDrTyQ=="
                }
              }
            },
            "bonjour": {
              "version": "3.5.0",
                "resolved": "https://registry.npmjs.org/bonjour/-/bonjour-3.5.0.tgz",
                "integrity": "sha1-jokKGD2O6aI5OzhExpGkK897yfU=",
                "requires": {
                "array-flatten": "^2.1.0",
                  "deep-equal": "^1.0.1",
                  "dns-equal": "^1.0.0",
                  "dns-txt": "^2.0.2",
                  "multicast-dns": "^6.0.1",
                  "multicast-dns-service-types": "^1.1.0"
              }
            },
            "boolbase": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
                "integrity": "sha1-aN/1++YMUes3cl6p4+0xDcwed24="
            },
            "brace-expansion": {
              "version": "1.1.11",
                "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
                "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
                "requires": {
                "balanced-match": "^1.0.0",
                  "concat-map": "0.0.1"
              }
            },
            "braces": {
              "version": "2.3.2",
                "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",
                "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",
                "requires": {
                "arr-flatten": "^1.1.0",
                  "array-unique": "^0.3.2",
                  "extend-shallow": "^2.0.1",
                  "fill-range": "^4.0.0",
                  "isobject": "^3.0.1",
                  "repeat-element": "^1.1.2",
                  "snapdragon": "^0.8.1",
                  "snapdragon-node": "^2.0.1",
                  "split-string": "^3.0.2",
                  "to-regex": "^3.0.1"
              },
              "dependencies": {
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                }
              }
            },
            "brorand": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
                "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8="
            },
            "browser-process-hrtime": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/browser-process-hrtime/-/browser-process-hrtime-0.1.3.tgz",
                "integrity": "sha512-bRFnI4NnjO6cnyLmOV/7PVoDEMJChlcfN0z4s1YMBY989/SvlfMI1lgCnkFUs53e9gQF+w7qu7XdllSTiSl8Aw=="
            },
            "browser-resolve": {
              "version": "1.11.3",
                "resolved": "https://registry.npmjs.org/browser-resolve/-/browser-resolve-1.11.3.tgz",
                "integrity": "sha512-exDi1BYWB/6raKHmDTCicQfTkqwN5fioMFV4j8BsfMU4R2DK/QfZfK7kOVkmWCNANf0snkBzqGqAJBao9gZMdQ==",
                "requires": {
                "resolve": "1.1.7"
              },
              "dependencies": {
                "resolve": {
                  "version": "1.1.7",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.1.7.tgz",
                    "integrity": "sha1-IDEU2CrSxe2ejgQRs5ModeiJ6Xs="
                }
              }
            },
            "browserify-aes": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
                "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
                "requires": {
                "buffer-xor": "^1.0.3",
                  "cipher-base": "^1.0.0",
                  "create-hash": "^1.1.0",
                  "evp_bytestokey": "^1.0.3",
                  "inherits": "^2.0.1",
                  "safe-buffer": "^5.0.1"
              }
            },
            "browserify-cipher": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
                "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
                "requires": {
                "browserify-aes": "^1.0.4",
                  "browserify-des": "^1.0.0",
                  "evp_bytestokey": "^1.0.0"
              }
            },
            "browserify-des": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
                "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
                "requires": {
                "cipher-base": "^1.0.1",
                  "des.js": "^1.0.0",
                  "inherits": "^2.0.1",
                  "safe-buffer": "^5.1.2"
              }
            },
            "browserify-rsa": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
                "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
                "requires": {
                "bn.js": "^4.1.0",
                  "randombytes": "^2.0.1"
              }
            },
            "browserify-sign": {
              "version": "4.0.4",
                "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.0.4.tgz",
                "integrity": "sha1-qk62jl17ZYuqa/alfmMMvXqT0pg=",
                "requires": {
                "bn.js": "^4.1.1",
                  "browserify-rsa": "^4.0.0",
                  "create-hash": "^1.1.0",
                  "create-hmac": "^1.1.2",
                  "elliptic": "^6.0.0",
                  "inherits": "^2.0.1",
                  "parse-asn1": "^5.0.0"
              }
            },
            "browserify-zlib": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
                "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
                "requires": {
                "pako": "~1.0.5"
              }
            },
            "browserslist": {
              "version": "4.8.3",
                "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.8.3.tgz",
                "integrity": "sha512-iU43cMMknxG1ClEZ2MDKeonKE1CCrFVkQK2AqO2YWFmvIrx4JWrvQ4w4hQez6EpVI8rHTtqh/ruHHDHSOKxvUg==",
                "requires": {
                "caniuse-lite": "^1.0.30001017",
                  "electron-to-chromium": "^1.3.322",
                  "node-releases": "^1.1.44"
              }
            },
            "bser": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/bser/-/bser-2.1.1.tgz",
                "integrity": "sha512-gQxTNE/GAfIIrmHLUE3oJyp5FO6HRBfhjnw4/wMmA63ZGDJnWBmgY/lyQBpnDUkGmAhbSe39tx2d/iTOAfglwQ==",
                "requires": {
                "node-int64": "^0.4.0"
              }
            },
            "buffer": {
              "version": "4.9.2",
                "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
                "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
                "requires": {
                "base64-js": "^1.0.2",
                  "ieee754": "^1.1.4",
                  "isarray": "^1.0.0"
              }
            },
            "buffer-from": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
                "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A=="
            },
            "buffer-indexof": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/buffer-indexof/-/buffer-indexof-1.1.1.tgz",
                "integrity": "sha512-4/rOEg86jivtPTeOUUT61jJO1Ya1TrR/OkqCSZDyq84WJh3LuuiphBYJN+fm5xufIk4XAFcEwte/8WzC8If/1g=="
            },
            "buffer-xor": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
                "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk="
            },
            "builtin-modules": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-1.1.1.tgz",
                "integrity": "sha1-Jw8HbFpywC9bZaR9+Uxf46J4iS8="
            },
            "builtin-status-codes": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
                "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug="
            },
            "bytes": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.0.0.tgz",
                "integrity": "sha1-0ygVQE1olpn4Wk6k+odV3ROpYEg="
            },
            "cacache": {
              "version": "13.0.1",
                "resolved": "https://registry.npmjs.org/cacache/-/cacache-13.0.1.tgz",
                "integrity": "sha512-5ZvAxd05HDDU+y9BVvcqYu2LLXmPnQ0hW62h32g4xBTgL/MppR4/04NHfj/ycM2y6lmTnbw6HVi+1eN0Psba6w==",
                "requires": {
                "chownr": "^1.1.2",
                  "figgy-pudding": "^3.5.1",
                  "fs-minipass": "^2.0.0",
                  "glob": "^7.1.4",
                  "graceful-fs": "^4.2.2",
                  "infer-owner": "^1.0.4",
                  "lru-cache": "^5.1.1",
                  "minipass": "^3.0.0",
                  "minipass-collect": "^1.0.2",
                  "minipass-flush": "^1.0.5",
                  "minipass-pipeline": "^1.2.2",
                  "mkdirp": "^0.5.1",
                  "move-concurrently": "^1.0.1",
                  "p-map": "^3.0.0",
                  "promise-inflight": "^1.0.1",
                  "rimraf": "^2.7.1",
                  "ssri": "^7.0.0",
                  "unique-filename": "^1.1.1"
              },
              "dependencies": {
                "glob": {
                  "version": "7.1.6",
                    "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
                    "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
                    "requires": {
                    "fs.realpath": "^1.0.0",
                      "inflight": "^1.0.4",
                      "inherits": "2",
                      "minimatch": "^3.0.4",
                      "once": "^1.3.0",
                      "path-is-absolute": "^1.0.0"
                  }
                },
                "graceful-fs": {
                  "version": "4.2.3",
                    "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.3.tgz",
                    "integrity": "sha512-a30VEBm4PEdx1dRB7MFK7BejejvCvBronbLjht+sHuGYj8PHs7M/5Z+rt5lw551vZ7yfTCj4Vuyy3mSJytDWRQ=="
                },
                "lru-cache": {
                  "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
                    "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
                    "requires": {
                    "yallist": "^3.0.2"
                  }
                },
                "rimraf": {
                  "version": "2.7.1",
                    "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
                    "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
                    "requires": {
                    "glob": "^7.1.3"
                  }
                },
                "yallist": {
                  "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
                    "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="
                }
              }
            },
            "cache-base": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
                "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
                "requires": {
                "collection-visit": "^1.0.0",
                  "component-emitter": "^1.2.1",
                  "get-value": "^2.0.6",
                  "has-value": "^1.0.0",
                  "isobject": "^3.0.1",
                  "set-value": "^2.0.0",
                  "to-object-path": "^0.3.0",
                  "union-value": "^1.0.0",
                  "unset-value": "^1.0.0"
              }
            },
            "call-me-maybe": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/call-me-maybe/-/call-me-maybe-1.0.1.tgz",
                "integrity": "sha1-JtII6onje1y95gJQoV8DHBak1ms="
            },
            "caller-callsite": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/caller-callsite/-/caller-callsite-2.0.0.tgz",
                "integrity": "sha1-hH4PzgoiN1CpoCfFSzNzGtMVQTQ=",
                "requires": {
                "callsites": "^2.0.0"
              },
              "dependencies": {
                "callsites": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/callsites/-/callsites-2.0.0.tgz",
                    "integrity": "sha1-BuuE8A7qQT2oav/vrL/7Ngk7PFA="
                }
              }
            },
            "caller-path": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-2.0.0.tgz",
                "integrity": "sha1-Ro+DBE42mrIBD6xfBs7uFbsssfQ=",
                "requires": {
                "caller-callsite": "^2.0.0"
              }
            },
            "callsites": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
                "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="
            },
            "camel-case": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/camel-case/-/camel-case-3.0.0.tgz",
                "integrity": "sha1-yjw2iKTpzzpM2nd9xNy8cTJJz3M=",
                "requires": {
                "no-case": "^2.2.0",
                  "upper-case": "^1.1.1"
              }
            },
            "camelcase": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-2.1.1.tgz",
                "integrity": "sha1-fB0W1nmhu+WcoCys7PsBHiAfWh8="
            },
            "camelcase-keys": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/camelcase-keys/-/camelcase-keys-2.1.0.tgz",
                "integrity": "sha1-MIvur/3ygRkFHvodkyITyRuPkuc=",
                "requires": {
                "camelcase": "^2.0.0",
                  "map-obj": "^1.0.0"
              }
            },
            "camelize": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/camelize/-/camelize-1.0.0.tgz",
                "integrity": "sha1-FkpUg+Yw+kMh5a8HAg5TGDGyYJs="
            },
            "caniuse-api": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/caniuse-api/-/caniuse-api-3.0.0.tgz",
                "integrity": "sha512-bsTwuIg/BZZK/vreVTYYbSWoe2F+71P7K5QGEX+pT250DZbfU1MQ5prOKpPR+LL6uWKK3KMwMCAS74QB3Um1uw==",
                "requires": {
                "browserslist": "^4.0.0",
                  "caniuse-lite": "^1.0.0",
                  "lodash.memoize": "^4.1.2",
                  "lodash.uniq": "^4.5.0"
              }
            },
            "caniuse-lite": {
              "version": "1.0.30001020",
                "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001020.tgz",
                "integrity": "sha512-yWIvwA68wRHKanAVS1GjN8vajAv7MBFshullKCeq/eKpK7pJBVDgFFEqvgWTkcP2+wIDeQGYFRXECjKZnLkUjA=="
            },
            "capture-exit": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/capture-exit/-/capture-exit-2.0.0.tgz",
                "integrity": "sha512-PiT/hQmTonHhl/HFGN+Lx3JJUznrVYJ3+AQsnthneZbvW7x+f08Tk7yLJTLEOUvBTbduLeeBkxEaYXUOUrRq6g==",
                "requires": {
                "rsvp": "^4.8.4"
              }
            },
            "case-sensitive-paths-webpack-plugin": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/case-sensitive-paths-webpack-plugin/-/case-sensitive-paths-webpack-plugin-2.2.0.tgz",
                "integrity": "sha512-u5ElzokS8A1pm9vM3/iDgTcI3xqHxuCao94Oz8etI3cf0Tio0p8izkDYbTIn09uP3yUUr6+veaE6IkjnTYS46g=="
            },
            "caseless": {
              "version": "0.12.0",
                "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
                "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw="
            },
            "chalk": {
              "version": "2.4.1",
                "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.1.tgz",
                "integrity": "sha512-ObN6h1v2fTJSmUXoS3nMQ92LbDK9be4TV+6G+omQlGJFdcUX5heKi1LZ1YnRMIgwTLEj3E24bT6tYni50rlCfQ==",
                "requires": {
                "ansi-styles": "^3.2.1",
                  "escape-string-regexp": "^1.0.5",
                  "supports-color": "^5.3.0"
              }
            },
            "chardet": {
              "version": "0.7.0",
                "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
                "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA=="
            },
            "chokidar": {
              "version": "2.1.8",
                "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.1.8.tgz",
                "integrity": "sha512-ZmZUazfOzf0Nve7duiCKD23PFSCs4JPoYyccjUFF3aQkQadqBhfzhjkwBH2mNOG9cTBwhamM37EIsIkZw3nRgg==",
                "requires": {
                "anymatch": "^2.0.0",
                  "async-each": "^1.0.1",
                  "braces": "^2.3.2",
                  "fsevents": "^1.2.7",
                  "glob-parent": "^3.1.0",
                  "inherits": "^2.0.3",
                  "is-binary-path": "^1.0.0",
                  "is-glob": "^4.0.0",
                  "normalize-path": "^3.0.0",
                  "path-is-absolute": "^1.0.0",
                  "readdirp": "^2.2.1",
                  "upath": "^1.1.1"
              },
              "dependencies": {
                "fsevents": {
                  "version": "1.2.11",
                    "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.11.tgz",
                    "integrity": "sha512-+ux3lx6peh0BpvY0JebGyZoiR4D+oYzdPZMKJwkZ+sFkNJzpL7tXc/wehS49gUAxg3tmMHPHZkA8JU2rhhgDHw==",
                    "optional": true,
                    "requires": {
                    "bindings": "^1.5.0",
                      "nan": "^2.12.1",
                      "node-pre-gyp": "*"
                  },
                  "dependencies": {
                    "abbrev": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "ansi-regex": {
                      "version": "2.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "aproba": {
                      "version": "1.2.0",
                        "bundled": true,
                        "optional": true
                    },
                    "are-we-there-yet": {
                      "version": "1.1.5",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "delegates": "^1.0.0",
                          "readable-stream": "^2.0.6"
                      }
                    },
                    "balanced-match": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "brace-expansion": {
                      "version": "1.1.11",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "balanced-match": "^1.0.0",
                          "concat-map": "0.0.1"
                      }
                    },
                    "chownr": {
                      "version": "1.1.3",
                        "bundled": true,
                        "optional": true
                    },
                    "code-point-at": {
                      "version": "1.1.0",
                        "bundled": true,
                        "optional": true
                    },
                    "concat-map": {
                      "version": "0.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "console-control-strings": {
                      "version": "1.1.0",
                        "bundled": true,
                        "optional": true
                    },
                    "core-util-is": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "debug": {
                      "version": "3.2.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ms": "^2.1.1"
                      }
                    },
                    "deep-extend": {
                      "version": "0.6.0",
                        "bundled": true,
                        "optional": true
                    },
                    "delegates": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "detect-libc": {
                      "version": "1.0.3",
                        "bundled": true,
                        "optional": true
                    },
                    "fs-minipass": {
                      "version": "1.2.7",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.6.0"
                      }
                    },
                    "fs.realpath": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "gauge": {
                      "version": "2.7.4",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "aproba": "^1.0.3",
                          "console-control-strings": "^1.0.0",
                          "has-unicode": "^2.0.0",
                          "object-assign": "^4.1.0",
                          "signal-exit": "^3.0.0",
                          "string-width": "^1.0.1",
                          "strip-ansi": "^3.0.1",
                          "wide-align": "^1.1.0"
                      }
                    },
                    "glob": {
                      "version": "7.1.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "fs.realpath": "^1.0.0",
                          "inflight": "^1.0.4",
                          "inherits": "2",
                          "minimatch": "^3.0.4",
                          "once": "^1.3.0",
                          "path-is-absolute": "^1.0.0"
                      }
                    },
                    "has-unicode": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "iconv-lite": {
                      "version": "0.4.24",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safer-buffer": ">= 2.1.2 < 3"
                      }
                    },
                    "ignore-walk": {
                      "version": "3.0.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minimatch": "^3.0.4"
                      }
                    },
                    "inflight": {
                      "version": "1.0.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "once": "^1.3.0",
                          "wrappy": "1"
                      }
                    },
                    "inherits": {
                      "version": "2.0.4",
                        "bundled": true,
                        "optional": true
                    },
                    "ini": {
                      "version": "1.3.5",
                        "bundled": true,
                        "optional": true
                    },
                    "is-fullwidth-code-point": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "number-is-nan": "^1.0.0"
                      }
                    },
                    "isarray": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "minimatch": {
                      "version": "3.0.4",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "brace-expansion": "^1.1.7"
                      }
                    },
                    "minimist": {
                      "version": "0.0.8",
                        "bundled": true,
                        "optional": true
                    },
                    "minipass": {
                      "version": "2.9.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.0"
                      }
                    },
                    "minizlib": {
                      "version": "1.3.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.9.0"
                      }
                    },
                    "mkdirp": {
                      "version": "0.5.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minimist": "0.0.8"
                      }
                    },
                    "ms": {
                      "version": "2.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "needle": {
                      "version": "2.4.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "debug": "^3.2.6",
                          "iconv-lite": "^0.4.4",
                          "sax": "^1.2.4"
                      }
                    },
                    "node-pre-gyp": {
                      "version": "0.14.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "detect-libc": "^1.0.2",
                          "mkdirp": "^0.5.1",
                          "needle": "^2.2.1",
                          "nopt": "^4.0.1",
                          "npm-packlist": "^1.1.6",
                          "npmlog": "^4.0.2",
                          "rc": "^1.2.7",
                          "rimraf": "^2.6.1",
                          "semver": "^5.3.0",
                          "tar": "^4.4.2"
                      }
                    },
                    "nopt": {
                      "version": "4.0.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "abbrev": "1",
                          "osenv": "^0.1.4"
                      }
                    },
                    "npm-bundled": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "npm-normalize-package-bin": "^1.0.1"
                      }
                    },
                    "npm-normalize-package-bin": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "npm-packlist": {
                      "version": "1.4.7",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ignore-walk": "^3.0.1",
                          "npm-bundled": "^1.0.1"
                      }
                    },
                    "npmlog": {
                      "version": "4.1.2",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "are-we-there-yet": "~1.1.2",
                          "console-control-strings": "~1.1.0",
                          "gauge": "~2.7.3",
                          "set-blocking": "~2.0.0"
                      }
                    },
                    "number-is-nan": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "object-assign": {
                      "version": "4.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "once": {
                      "version": "1.4.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "wrappy": "1"
                      }
                    },
                    "os-homedir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "os-tmpdir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "osenv": {
                      "version": "0.1.5",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "os-homedir": "^1.0.0",
                          "os-tmpdir": "^1.0.0"
                      }
                    },
                    "path-is-absolute": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "process-nextick-args": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "rc": {
                      "version": "1.2.8",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "deep-extend": "^0.6.0",
                          "ini": "~1.3.0",
                          "minimist": "^1.2.0",
                          "strip-json-comments": "~2.0.1"
                      },
                      "dependencies": {
                        "minimist": {
                          "version": "1.2.0",
                            "bundled": true,
                            "optional": true
                        }
                      }
                    },
                    "readable-stream": {
                      "version": "2.3.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "core-util-is": "~1.0.0",
                          "inherits": "~2.0.3",
                          "isarray": "~1.0.0",
                          "process-nextick-args": "~2.0.0",
                          "safe-buffer": "~5.1.1",
                          "string_decoder": "~1.1.1",
                          "util-deprecate": "~1.0.1"
                      }
                    },
                    "rimraf": {
                      "version": "2.7.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "glob": "^7.1.3"
                      }
                    },
                    "safe-buffer": {
                      "version": "5.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "safer-buffer": {
                      "version": "2.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "sax": {
                      "version": "1.2.4",
                        "bundled": true,
                        "optional": true
                    },
                    "semver": {
                      "version": "5.7.1",
                        "bundled": true,
                        "optional": true
                    },
                    "set-blocking": {
                      "version": "2.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "signal-exit": {
                      "version": "3.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "string-width": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "code-point-at": "^1.0.0",
                          "is-fullwidth-code-point": "^1.0.0",
                          "strip-ansi": "^3.0.0"
                      }
                    },
                    "string_decoder": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "~5.1.0"
                      }
                    },
                    "strip-ansi": {
                      "version": "3.0.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ansi-regex": "^2.0.0"
                      }
                    },
                    "strip-json-comments": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "tar": {
                      "version": "4.4.13",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "chownr": "^1.1.1",
                          "fs-minipass": "^1.2.5",
                          "minipass": "^2.8.6",
                          "minizlib": "^1.2.1",
                          "mkdirp": "^0.5.0",
                          "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.3"
                      }
                    },
                    "util-deprecate": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "wide-align": {
                      "version": "1.1.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "string-width": "^1.0.2 || 2"
                      }
                    },
                    "wrappy": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "yallist": {
                      "version": "3.1.1",
                        "bundled": true,
                        "optional": true
                    }
                  }
                },
                "glob-parent": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
                    "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
                    "requires": {
                    "is-glob": "^3.1.0",
                      "path-dirname": "^1.0.0"
                  },
                  "dependencies": {
                    "is-glob": {
                      "version": "3.1.0",
                        "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
                        "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
                        "requires": {
                        "is-extglob": "^2.1.0"
                      }
                    }
                  }
                },
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                },
                "normalize-path": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
                    "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
                }
              }
            },
            "chownr": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.3.tgz",
                "integrity": "sha512-i70fVHhmV3DtTl6nqvZOnIjbY0Pe4kAUjwHj8z0zAdgBtYrJyYwLKCCuRBQ5ppkyL0AkN7HKRnETdmdp1zqNXw=="
            },
            "chrome-trace-event": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.2.tgz",
                "integrity": "sha512-9e/zx1jw7B4CO+c/RXoCsfg/x1AfUBioy4owYH0bJprEYAx5hRFLRhWBqHAG57D0ZM4H7vxbP7bPe0VwhQRYDQ==",
                "requires": {
                "tslib": "^1.9.0"
              }
            },
            "ci-info": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-2.0.0.tgz",
                "integrity": "sha512-5tK7EtrZ0N+OLFMthtqOj4fI2Jeb88C4CAZPu25LDVUgXJ0A3Js4PMGqrn0JU1W0Mh1/Z8wZzYPxqUrXeBboCQ=="
            },
            "cipher-base": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
                "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
                "requires": {
                "inherits": "^2.0.1",
                  "safe-buffer": "^5.0.1"
              }
            },
            "circular-json": {
              "version": "0.3.3",
                "resolved": "https://registry.npmjs.org/circular-json/-/circular-json-0.3.3.tgz",
                "integrity": "sha512-UZK3NBx2Mca+b5LsG7bY183pHWt5Y1xts4P3Pz7ENTwGVnJOUWbRb3ocjvX7hx9tq/yTAdclXm9sZ38gNuem4A==",
                "dev": true
            },
            "class-utils": {
              "version": "0.3.6",
                "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
                "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
                "requires": {
                "arr-union": "^3.1.0",
                  "define-property": "^0.2.5",
                  "isobject": "^3.0.0",
                  "static-extend": "^0.1.1"
              },
              "dependencies": {
                "define-property": {
                  "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                    "is-descriptor": "^0.1.0"
                  }
                }
              }
            },
            "classnames": {
              "version": "2.2.6",
                "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.2.6.tgz",
                "integrity": "sha512-JR/iSQOSt+LQIWwrwEzJ9uk0xfN3mTVYMwt1Ir5mUcSN6pU+V4zQFFaJsclJbPuAUQH+yfWef6tm7l1quW3C8Q=="
            },
            "clean-css": {
              "version": "4.2.1",
                "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-4.2.1.tgz",
                "integrity": "sha512-4ZxI6dy4lrY6FHzfiy1aEOXgu4LIsW2MhwG0VBKdcoGoH/XLFgaHSdLTGr4O8Be6A8r3MOphEiI8Gc1n0ecf3g==",
                "requires": {
                "source-map": "~0.6.0"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "clean-stack": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/clean-stack/-/clean-stack-2.2.0.tgz",
                "integrity": "sha512-4diC9HaTE+KRAMWhDhrGOECgWZxoevMc5TlkObMqNSsVU62PYzXZ/SMTjzyGAFF1YusgxGcSWTEXBhp0CPwQ1A=="
            },
            "cli-cursor": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-2.1.0.tgz",
                "integrity": "sha1-s12sN2R5+sw+lHR9QdDQ9SOP/LU=",
                "requires": {
                "restore-cursor": "^2.0.0"
              }
            },
            "cli-width": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-2.2.0.tgz",
                "integrity": "sha1-/xnt6Kml5XkyQUewwR8PvLq+1jk="
            },
            "cliui": {
              "version": "3.2.0",
                "resolved": "https://registry.npmjs.org/cliui/-/cliui-3.2.0.tgz",
                "integrity": "sha1-EgYBU3qRbSmUD5NNo7SNWFo5IT0=",
                "requires": {
                "string-width": "^1.0.1",
                  "strip-ansi": "^3.0.1",
                  "wrap-ansi": "^2.0.0"
              },
              "dependencies": {
                "is-fullwidth-code-point": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
                    "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
                    "requires": {
                    "number-is-nan": "^1.0.0"
                  }
                },
                "string-width": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
                    "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
                    "requires": {
                    "code-point-at": "^1.0.0",
                      "is-fullwidth-code-point": "^1.0.0",
                      "strip-ansi": "^3.0.0"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                }
              }
            },
            "clone-deep": {
              "version": "0.2.4",
                "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-0.2.4.tgz",
                "integrity": "sha1-TnPdCen7lxzDhnDF3O2cGJZIHMY=",
                "requires": {
                "for-own": "^0.1.3",
                  "is-plain-object": "^2.0.1",
                  "kind-of": "^3.0.2",
                  "lazy-cache": "^1.0.3",
                  "shallow-clone": "^0.1.2"
              }
            },
            "co": {
              "version": "4.6.0",
                "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
                "integrity": "sha1-bqa989hTrlTMuOR7+gvz+QMfsYQ="
            },
            "coa": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/coa/-/coa-2.0.2.tgz",
                "integrity": "sha512-q5/jG+YQnSy4nRTV4F7lPepBJZ8qBNJJDBuJdoejDyLXgmL7IEo+Le2JDZudFTFt7mrCqIRaSjws4ygRCTCAXA==",
                "requires": {
                "@types/q": "^1.5.1",
                  "chalk": "^2.4.1",
                  "q": "^1.1.2"
              }
            },
            "code-point-at": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
                "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c="
            },
            "collection-visit": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
                "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
                "requires": {
                "map-visit": "^1.0.0",
                  "object-visit": "^1.0.0"
              }
            },
            "color": {
              "version": "3.1.2",
                "resolved": "https://registry.npmjs.org/color/-/color-3.1.2.tgz",
                "integrity": "sha512-vXTJhHebByxZn3lDvDJYw4lR5+uB3vuoHsuYA5AKuxRVn5wzzIfQKGLBmgdVRHKTJYeK5rvJcHnrd0Li49CFpg==",
                "requires": {
                "color-convert": "^1.9.1",
                  "color-string": "^1.5.2"
              }
            },
            "color-convert": {
              "version": "1.9.3",
                "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
                "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
                "requires": {
                "color-name": "1.1.3"
              }
            },
            "color-name": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
                "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU="
            },
            "color-string": {
              "version": "1.5.3",
                "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.5.3.tgz",
                "integrity": "sha512-dC2C5qeWoYkxki5UAXapdjqO672AM4vZuPGRQfO8b5HKuKGBbKWpITyDYN7TOFKvRW7kOgAn3746clDBMDJyQw==",
                "requires": {
                "color-name": "^1.0.0",
                  "simple-swizzle": "^0.2.2"
              }
            },
            "combined-stream": {
              "version": "1.0.8",
                "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
                "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
                "requires": {
                "delayed-stream": "~1.0.0"
              }
            },
            "commander": {
              "version": "2.20.3",
                "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
                "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
            },
            "common-tags": {
              "version": "1.8.0",
                "resolved": "https://registry.npmjs.org/common-tags/-/common-tags-1.8.0.tgz",
                "integrity": "sha512-6P6g0uetGpW/sdyUy/iQQCbFF0kWVMSIVSyYz7Zgjcgh8mgw8PQzDNZeyZ5DQ2gM7LBoZPHmnjz8rUthkBG5tw=="
            },
            "commondir": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
                "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs="
            },
            "component-classes": {
              "version": "1.2.6",
                "resolved": "https://registry.npmjs.org/component-classes/-/component-classes-1.2.6.tgz",
                "integrity": "sha1-xkI5TDYYpNiwuJGe/Mu9kw5c1pE=",
                "requires": {
                "component-indexof": "0.0.3"
              }
            },
            "component-emitter": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
                "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg=="
            },
            "component-indexof": {
              "version": "0.0.3",
                "resolved": "https://registry.npmjs.org/component-indexof/-/component-indexof-0.0.3.tgz",
                "integrity": "sha1-EdCRMSI5648yyPJa6csAL/6NPCQ="
            },
            "compose-function": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/compose-function/-/compose-function-3.0.3.tgz",
                "integrity": "sha1-ntZ18TzFRQHTCVCkhv9qe6OrGF8=",
                "requires": {
                "arity-n": "^1.0.4"
              }
            },
            "compressible": {
              "version": "2.0.18",
                "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
                "integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
                "requires": {
                "mime-db": ">= 1.43.0 < 2"
              }
            },
            "compression": {
              "version": "1.7.4",
                "resolved": "https://registry.npmjs.org/compression/-/compression-1.7.4.tgz",
                "integrity": "sha512-jaSIDzP9pZVS4ZfQ+TzvtiWhdpFhE2RDHz8QJkpX9SIpLq88VueF5jJw6t+6CUQcAoA6t+x89MLrWAqpfDE8iQ==",
                "requires": {
                "accepts": "~1.3.5",
                  "bytes": "3.0.0",
                  "compressible": "~2.0.16",
                  "debug": "2.6.9",
                  "on-headers": "~1.0.2",
                  "safe-buffer": "5.1.2",
                  "vary": "~1.1.2"
              }
            },
            "concat-map": {
              "version": "0.0.1",
                "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
                "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s="
            },
            "concat-stream": {
              "version": "1.6.2",
                "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
                "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
                "requires": {
                "buffer-from": "^1.0.0",
                  "inherits": "^2.0.3",
                  "readable-stream": "^2.2.2",
                  "typedarray": "^0.0.6"
              }
            },
            "confusing-browser-globals": {
              "version": "1.0.9",
                "resolved": "https://registry.npmjs.org/confusing-browser-globals/-/confusing-browser-globals-1.0.9.tgz",
                "integrity": "sha512-KbS1Y0jMtyPgIxjO7ZzMAuUpAKMt1SzCL9fsrKsX6b0zJPTaT0SiSPmewwVZg9UAO83HVIlEhZF84LIjZ0lmAw=="
            },
            "connect-history-api-fallback": {
              "version": "1.6.0",
                "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-1.6.0.tgz",
                "integrity": "sha512-e54B99q/OUoH64zYYRf3HBP5z24G38h5D3qXu23JGRoigpX5Ss4r9ZnDk3g0Z8uQC2x2lPaJ+UlWBc1ZWBWdLg=="
            },
            "console-browserify": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
                "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA=="
            },
            "console-control-strings": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/console-control-strings/-/console-control-strings-1.1.0.tgz",
                "integrity": "sha1-PXz0Rk22RG6mRL9LOVB/mFEAjo4="
            },
            "constants-browserify": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
                "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U="
            },
            "contains-path": {
              "version": "0.1.0",
                "resolved": "https://registry.npmjs.org/contains-path/-/contains-path-0.1.0.tgz",
                "integrity": "sha1-/ozxhP9mcLa67wGp1IYaXL7EEgo="
            },
            "content-disposition": {
              "version": "0.5.3",
                "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.3.tgz",
                "integrity": "sha512-ExO0774ikEObIAEV9kDo50o+79VCUdEB6n6lzKgGwupcVeRlhrj3qGAfwq8G6uBJjkqLrhT0qEYFcWng8z1z0g==",
                "requires": {
                "safe-buffer": "5.1.2"
              }
            },
            "content-type": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
                "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA=="
            },
            "convert-source-map": {
              "version": "1.6.0",
                "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.6.0.tgz",
                "integrity": "sha512-eFu7XigvxdZ1ETfbgPBohgyQ/Z++C0eEhTor0qRwBw9unw+L0/6V8wkSuGgzdThkiS5lSpdptOQPD8Ak40a+7A==",
                "requires": {
                "safe-buffer": "~5.1.1"
              }
            },
            "cookie": {
              "version": "0.4.0",
                "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.4.0.tgz",
                "integrity": "sha512-+Hp8fLp57wnUSt0tY0tHEXh4voZRDnoIrZPqlo3DPiI4y9lwg/jqx+1Om94/W6ZaPDOUbnjOt/99w66zk+l1Xg=="
            },
            "cookie-signature": {
              "version": "1.0.6",
                "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
                "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw="
            },
            "copy-concurrently": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
                "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
                "requires": {
                "aproba": "^1.1.1",
                  "fs-write-stream-atomic": "^1.0.8",
                  "iferr": "^0.1.5",
                  "mkdirp": "^0.5.1",
                  "rimraf": "^2.5.4",
                  "run-queue": "^1.0.0"
              }
            },
            "copy-descriptor": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
                "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40="
            },
            "copy-to-clipboard": {
              "version": "3.2.0",
                "resolved": "https://registry.npmjs.org/copy-to-clipboard/-/copy-to-clipboard-3.2.0.tgz",
                "integrity": "sha512-eOZERzvCmxS8HWzugj4Uxl8OJxa7T2k1Gi0X5qavwydHIfuSHq2dTD09LOg/XyGq4Zpb5IsR/2OJ5lbOegz78w==",
                "requires": {
                "toggle-selection": "^1.0.6"
              }
            },
            "core-js": {
              "version": "2.6.9",
                "resolved": "https://registry.npmjs.org/core-js/-/core-js-2.6.9.tgz",
                "integrity": "sha512-HOpZf6eXmnl7la+cUdMnLvUxKNqLUzJvgIziQ0DiF3JwSImNphIqdGqzj6hIKyX04MmV0poclQ7+wjWvxQyR2A=="
            },
            "core-js-compat": {
              "version": "3.6.3",
                "resolved": "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.6.3.tgz",
                "integrity": "sha512-Y3YNGU3bU1yrnzVodop23ghArbKv4IqkZg9MMOWv/h7KT6NRk1/SzHhWDDlubg2+tlcUzAqgj1/GyeJ9fUKMeg==",
                "requires": {
                "browserslist": "^4.8.3",
                  "semver": "7.0.0"
              },
              "dependencies": {
                "semver": {
                  "version": "7.0.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-7.0.0.tgz",
                    "integrity": "sha512-+GB6zVA9LWh6zovYQLALHwv5rb2PHGlJi3lfiqIHxR0uuwCgefcOJc59v9fv1w8GbStwxuuqqAjI9NMAOOgq1A=="
                }
              }
            },
            "core-js-pure": {
              "version": "3.6.3",
                "resolved": "https://registry.npmjs.org/core-js-pure/-/core-js-pure-3.6.3.tgz",
                "integrity": "sha512-4LhJ4fw0sC4/8X5krM9hI5oQ3cgYHYojWwwWnQKjC6k6vf/qIVS9d0r3+Bdn+FUADgRpD0xzPFQ9P7cOeuIwlA=="
            },
            "core-util-is": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/core-util-is/-/core-util-is-1.0.2.tgz",
                "integrity": "sha1-tf1UIgqivFq1eqtxQMlAdUUDwac="
            },
            "cosmiconfig": {
              "version": "5.2.1",
                "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-5.2.1.tgz",
                "integrity": "sha512-H65gsXo1SKjf8zmrJ67eJk8aIRKV5ff2D4uKZIBZShbhGSpEmsQOPW/SKMKYhSTrqR7ufy6RP69rPogdaPh/kA==",
                "requires": {
                "import-fresh": "^2.0.0",
                  "is-directory": "^0.3.1",
                  "js-yaml": "^3.13.1",
                  "parse-json": "^4.0.0"
              }
            },
            "create-ecdh": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/create-ecdh/-/create-ecdh-4.0.3.tgz",
                "integrity": "sha512-GbEHQPMOswGpKXM9kCWVrremUcBmjteUaQ01T9rkKCPDXfUHX0IoP9LpHYo2NPFampa4e+/pFDc3jQdxrxQLaw==",
                "requires": {
                "bn.js": "^4.1.0",
                  "elliptic": "^6.0.0"
              }
            },
            "create-hash": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/create-hash/-/create-hash-1.2.0.tgz",
                "integrity": "sha512-z00bCGNHDG8mHAkP7CtT1qVu+bFQUPjYq/4Iv3C3kWjTFV10zIjfSoeqXo9Asws8gwSHDGj/hl2u4OGIjapeCg==",
                "requires": {
                "cipher-base": "^1.0.1",
                  "inherits": "^2.0.1",
                  "md5.js": "^1.3.4",
                  "ripemd160": "^2.0.1",
                  "sha.js": "^2.4.0"
              }
            },
            "create-hmac": {
              "version": "1.1.7",
                "resolved": "https://registry.npmjs.org/create-hmac/-/create-hmac-1.1.7.tgz",
                "integrity": "sha512-MJG9liiZ+ogc4TzUwuvbER1JRdgvUFSB5+VR/g5h82fGaIRWMWddtKBHi7/sVhfjQZ6SehlyhvQYrcYkaUIpLg==",
                "requires": {
                "cipher-base": "^1.0.3",
                  "create-hash": "^1.1.0",
                  "inherits": "^2.0.1",
                  "ripemd160": "^2.0.0",
                  "safe-buffer": "^5.0.1",
                  "sha.js": "^2.4.8"
              }
            },
            "create-react-class": {
              "version": "15.6.3",
                "resolved": "https://registry.npmjs.org/create-react-class/-/create-react-class-15.6.3.tgz",
                "integrity": "sha512-M+/3Q6E6DLO6Yx3OwrWjwHBnvfXXYA7W+dFjt/ZDBemHO1DDZhsalX/NUtnTYclN6GfnBDRh4qRHjcDHmlJBJg==",
                "requires": {
                "fbjs": "^0.8.9",
                  "loose-envify": "^1.3.1",
                  "object-assign": "^4.1.1"
              }
            },
            "create-react-context": {
              "version": "0.2.3",
                "resolved": "https://registry.npmjs.org/create-react-context/-/create-react-context-0.2.3.tgz",
                "integrity": "sha512-CQBmD0+QGgTaxDL3OX1IDXYqjkp2It4RIbcb99jS6AEg27Ga+a9G3JtK6SIu0HBwPLZlmwt9F7UwWA4Bn92Rag==",
                "requires": {
                "fbjs": "^0.8.0",
                  "gud": "^1.0.0"
              }
            },
            "cross-spawn": {
              "version": "6.0.5",
                "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-6.0.5.tgz",
                "integrity": "sha512-eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd+M7A5XDdxVRWO5MxGBXZhjY4cqLYLdtrGqRf8mBPmzwSpWQ==",
                "requires": {
                "nice-try": "^1.0.4",
                  "path-key": "^2.0.1",
                  "semver": "^5.5.0",
                  "shebang-command": "^1.2.0",
                  "which": "^1.2.9"
              }
            },
            "crypto-browserify": {
              "version": "3.12.0",
                "resolved": "https://registry.npmjs.org/crypto-browserify/-/crypto-browserify-3.12.0.tgz",
                "integrity": "sha512-fz4spIh+znjO2VjL+IdhEpRJ3YN6sMzITSBijk6FK2UvTqruSQW+/cCZTSNsMiZNvUeq0CqurF+dAbyiGOY6Wg==",
                "requires": {
                "browserify-cipher": "^1.0.0",
                  "browserify-sign": "^4.0.0",
                  "create-ecdh": "^4.0.0",
                  "create-hash": "^1.1.0",
                  "create-hmac": "^1.1.0",
                  "diffie-hellman": "^5.0.0",
                  "inherits": "^2.0.1",
                  "pbkdf2": "^3.0.3",
                  "public-encrypt": "^4.0.0",
                  "randombytes": "^2.0.0",
                  "randomfill": "^1.0.3"
              }
            },
            "css": {
              "version": "2.2.4",
                "resolved": "https://registry.npmjs.org/css/-/css-2.2.4.tgz",
                "integrity": "sha512-oUnjmWpy0niI3x/mPL8dVEI1l7MnG3+HHyRPHf+YFSbK+svOhXpmSOcDURUh2aOCgl2grzrOPt1nHLuCVFULLw==",
                "requires": {
                "inherits": "^2.0.3",
                  "source-map": "^0.6.1",
                  "source-map-resolve": "^0.5.2",
                  "urix": "^0.1.0"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "css-animation": {
              "version": "1.6.1",
                "resolved": "https://registry.npmjs.org/css-animation/-/css-animation-1.6.1.tgz",
                "integrity": "sha512-/48+/BaEaHRY6kNQ2OIPzKf9A6g8WjZYjhiNDNuIVbsm5tXCGIAsHDjB4Xu1C4vXJtUWZo26O68OQkDpNBaPog==",
                "requires": {
                "babel-runtime": "6.x",
                  "component-classes": "^1.2.5"
              }
            },
            "css-blank-pseudo": {
              "version": "0.1.4",
                "resolved": "https://registry.npmjs.org/css-blank-pseudo/-/css-blank-pseudo-0.1.4.tgz",
                "integrity": "sha512-LHz35Hr83dnFeipc7oqFDmsjHdljj3TQtxGGiNWSOsTLIAubSm4TEz8qCaKFpk7idaQ1GfWscF4E6mgpBysA1w==",
                "requires": {
                "postcss": "^7.0.5"
              }
            },
            "css-color-keywords": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/css-color-keywords/-/css-color-keywords-1.0.0.tgz",
                "integrity": "sha1-/qJhbcZ2spYmhrOvjb2+GAskTgU="
            },
            "css-color-names": {
              "version": "0.0.4",
                "resolved": "https://registry.npmjs.org/css-color-names/-/css-color-names-0.0.4.tgz",
                "integrity": "sha1-gIrcLnnPhHOAabZGyyDsJ762KeA="
            },
            "css-declaration-sorter": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/css-declaration-sorter/-/css-declaration-sorter-4.0.1.tgz",
                "integrity": "sha512-BcxQSKTSEEQUftYpBVnsH4SF05NTuBokb19/sBt6asXGKZ/6VP7PLG1CBCkFDYOnhXhPh0jMhO6xZ71oYHXHBA==",
                "requires": {
                "postcss": "^7.0.1",
                  "timsort": "^0.3.0"
              }
            },
            "css-has-pseudo": {
              "version": "0.10.0",
                "resolved": "https://registry.npmjs.org/css-has-pseudo/-/css-has-pseudo-0.10.0.tgz",
                "integrity": "sha512-Z8hnfsZu4o/kt+AuFzeGpLVhFOGO9mluyHBaA2bA8aCGTwah5sT3WV/fTHH8UNZUytOIImuGPrl/prlb4oX4qQ==",
                "requires": {
                "postcss": "^7.0.6",
                  "postcss-selector-parser": "^5.0.0-rc.4"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "css-loader": {
              "version": "3.2.0",
                "resolved": "https://registry.npmjs.org/css-loader/-/css-loader-3.2.0.tgz",
                "integrity": "sha512-QTF3Ud5H7DaZotgdcJjGMvyDj5F3Pn1j/sC6VBEOVp94cbwqyIBdcs/quzj4MC1BKQSrTpQznegH/5giYbhnCQ==",
                "requires": {
                "camelcase": "^5.3.1",
                  "cssesc": "^3.0.0",
                  "icss-utils": "^4.1.1",
                  "loader-utils": "^1.2.3",
                  "normalize-path": "^3.0.0",
                  "postcss": "^7.0.17",
                  "postcss-modules-extract-imports": "^2.0.0",
                  "postcss-modules-local-by-default": "^3.0.2",
                  "postcss-modules-scope": "^2.1.0",
                  "postcss-modules-values": "^3.0.0",
                  "postcss-value-parser": "^4.0.0",
                  "schema-utils": "^2.0.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "normalize-path": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
                    "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="
                }
              }
            },
            "css-prefers-color-scheme": {
              "version": "3.1.1",
                "resolved": "https://registry.npmjs.org/css-prefers-color-scheme/-/css-prefers-color-scheme-3.1.1.tgz",
                "integrity": "sha512-MTu6+tMs9S3EUqzmqLXEcgNRbNkkD/TGFvowpeoWJn5Vfq7FMgsmRQs9X5NXAURiOBmOxm/lLjsDNXDE6k9bhg==",
                "requires": {
                "postcss": "^7.0.5"
              }
            },
            "css-select": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/css-select/-/css-select-2.1.0.tgz",
                "integrity": "sha512-Dqk7LQKpwLoH3VovzZnkzegqNSuAziQyNZUcrdDM401iY+R5NkGBXGmtO05/yaXQziALuPogeG0b7UAgjnTJTQ==",
                "requires": {
                "boolbase": "^1.0.0",
                  "css-what": "^3.2.1",
                  "domutils": "^1.7.0",
                  "nth-check": "^1.0.2"
              }
            },
            "css-select-base-adapter": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/css-select-base-adapter/-/css-select-base-adapter-0.1.1.tgz",
                "integrity": "sha512-jQVeeRG70QI08vSTwf1jHxp74JoZsr2XSgETae8/xC8ovSnL2WF87GTLO86Sbwdt2lK4Umg4HnnwMO4YF3Ce7w=="
            },
            "css-to-react-native": {
              "version": "2.3.2",
                "resolved": "https://registry.npmjs.org/css-to-react-native/-/css-to-react-native-2.3.2.tgz",
                "integrity": "sha512-VOFaeZA053BqvvvqIA8c9n0+9vFppVBAHCp6JgFTtTMU3Mzi+XnelJ9XC9ul3BqFzZyQ5N+H0SnwsWT2Ebchxw==",
                "requires": {
                "camelize": "^1.0.0",
                  "css-color-keywords": "^1.0.0",
                  "postcss-value-parser": "^3.3.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "css-tree": {
              "version": "1.0.0-alpha.37",
                "resolved": "https://registry.npmjs.org/css-tree/-/css-tree-1.0.0-alpha.37.tgz",
                "integrity": "sha512-DMxWJg0rnz7UgxKT0Q1HU/L9BeJI0M6ksor0OgqOnF+aRCDWg/N2641HmVyU9KVIu0OVVWOb2IpC9A+BJRnejg==",
                "requires": {
                "mdn-data": "2.0.4",
                  "source-map": "^0.6.1"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "css-unit-converter": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/css-unit-converter/-/css-unit-converter-1.1.1.tgz",
                "integrity": "sha1-2bkoGtz9jO2TW9urqDeGiX9k6ZY="
            },
            "css-what": {
              "version": "3.2.1",
                "resolved": "https://registry.npmjs.org/css-what/-/css-what-3.2.1.tgz",
                "integrity": "sha512-WwOrosiQTvyms+Ti5ZC5vGEK0Vod3FTt1ca+payZqvKuGJF+dq7bG63DstxtN0dpm6FxY27a/zS3Wten+gEtGw=="
            },
            "cssdb": {
              "version": "4.4.0",
                "resolved": "https://registry.npmjs.org/cssdb/-/cssdb-4.4.0.tgz",
                "integrity": "sha512-LsTAR1JPEM9TpGhl/0p3nQecC2LJ0kD8X5YARu1hk/9I1gril5vDtMZyNxcEpxxDj34YNck/ucjuoUd66K03oQ=="
            },
            "cssesc": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
                "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="
            },
            "cssnano": {
              "version": "4.1.10",
                "resolved": "https://registry.npmjs.org/cssnano/-/cssnano-4.1.10.tgz",
                "integrity": "sha512-5wny+F6H4/8RgNlaqab4ktc3e0/blKutmq8yNlBFXA//nSFFAqAngjNVRzUvCgYROULmZZUoosL/KSoZo5aUaQ==",
                "requires": {
                "cosmiconfig": "^5.0.0",
                  "cssnano-preset-default": "^4.0.7",
                  "is-resolvable": "^1.0.0",
                  "postcss": "^7.0.0"
              }
            },
            "cssnano-preset-default": {
              "version": "4.0.7",
                "resolved": "https://registry.npmjs.org/cssnano-preset-default/-/cssnano-preset-default-4.0.7.tgz",
                "integrity": "sha512-x0YHHx2h6p0fCl1zY9L9roD7rnlltugGu7zXSKQx6k2rYw0Hi3IqxcoAGF7u9Q5w1nt7vK0ulxV8Lo+EvllGsA==",
                "requires": {
                "css-declaration-sorter": "^4.0.1",
                  "cssnano-util-raw-cache": "^4.0.1",
                  "postcss": "^7.0.0",
                  "postcss-calc": "^7.0.1",
                  "postcss-colormin": "^4.0.3",
                  "postcss-convert-values": "^4.0.1",
                  "postcss-discard-comments": "^4.0.2",
                  "postcss-discard-duplicates": "^4.0.2",
                  "postcss-discard-empty": "^4.0.1",
                  "postcss-discard-overridden": "^4.0.1",
                  "postcss-merge-longhand": "^4.0.11",
                  "postcss-merge-rules": "^4.0.3",
                  "postcss-minify-font-values": "^4.0.2",
                  "postcss-minify-gradients": "^4.0.2",
                  "postcss-minify-params": "^4.0.2",
                  "postcss-minify-selectors": "^4.0.2",
                  "postcss-normalize-charset": "^4.0.1",
                  "postcss-normalize-display-values": "^4.0.2",
                  "postcss-normalize-positions": "^4.0.2",
                  "postcss-normalize-repeat-style": "^4.0.2",
                  "postcss-normalize-string": "^4.0.2",
                  "postcss-normalize-timing-functions": "^4.0.2",
                  "postcss-normalize-unicode": "^4.0.1",
                  "postcss-normalize-url": "^4.0.1",
                  "postcss-normalize-whitespace": "^4.0.2",
                  "postcss-ordered-values": "^4.1.2",
                  "postcss-reduce-initial": "^4.0.3",
                  "postcss-reduce-transforms": "^4.0.2",
                  "postcss-svgo": "^4.0.2",
                  "postcss-unique-selectors": "^4.0.1"
              }
            },
            "cssnano-util-get-arguments": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/cssnano-util-get-arguments/-/cssnano-util-get-arguments-4.0.0.tgz",
                "integrity": "sha1-7ToIKZ8h11dBsg87gfGU7UnMFQ8="
            },
            "cssnano-util-get-match": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/cssnano-util-get-match/-/cssnano-util-get-match-4.0.0.tgz",
                "integrity": "sha1-wOTKB/U4a7F+xeUiULT1lhNlFW0="
            },
            "cssnano-util-raw-cache": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/cssnano-util-raw-cache/-/cssnano-util-raw-cache-4.0.1.tgz",
                "integrity": "sha512-qLuYtWK2b2Dy55I8ZX3ky1Z16WYsx544Q0UWViebptpwn/xDBmog2TLg4f+DBMg1rJ6JDWtn96WHbOKDWt1WQA==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "cssnano-util-same-parent": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/cssnano-util-same-parent/-/cssnano-util-same-parent-4.0.1.tgz",
                "integrity": "sha512-WcKx5OY+KoSIAxBW6UBBRay1U6vkYheCdjyVNDm85zt5K9mHoGOfsOsqIszfAqrQQFIIKgjh2+FDgIj/zsl21Q=="
            },
            "csso": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/csso/-/csso-4.0.2.tgz",
                "integrity": "sha512-kS7/oeNVXkHWxby5tHVxlhjizRCSv8QdU7hB2FpdAibDU8FjTAolhNjKNTiLzXtUrKT6HwClE81yXwEk1309wg==",
                "requires": {
                "css-tree": "1.0.0-alpha.37"
              }
            },
            "cssom": {
              "version": "0.3.8",
                "resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.8.tgz",
                "integrity": "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg=="
            },
            "cssstyle": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-1.4.0.tgz",
                "integrity": "sha512-GBrLZYZ4X4x6/QEoBnIrqb8B/f5l4+8me2dkom/j1Gtbxy0kBv6OGzKuAsGM75bkGwGAFkt56Iwg28S3XTZgSA==",
                "requires": {
                "cssom": "0.3.x"
              }
            },
            "csstype": {
              "version": "2.6.8",
                "resolved": "https://registry.npmjs.org/csstype/-/csstype-2.6.8.tgz",
                "integrity": "sha512-msVS9qTuMT5zwAGCVm4mxfrZ18BNc6Csd0oJAtiFMZ1FAx1CCvy2+5MDmYoix63LM/6NDbNtodCiGYGmFgO0dA=="
            },
            "currently-unhandled": {
              "version": "0.4.1",
                "resolved": "https://registry.npmjs.org/currently-unhandled/-/currently-unhandled-0.4.1.tgz",
                "integrity": "sha1-mI3zP+qxke95mmE2nddsF635V+o=",
                "requires": {
                "array-find-index": "^1.0.1"
              }
            },
            "cyclist": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/cyclist/-/cyclist-1.0.1.tgz",
                "integrity": "sha1-WW6WmP0MgOEgOMK4LW6xs1tiJNk="
            },
            "d": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/d/-/d-1.0.1.tgz",
                "integrity": "sha512-m62ShEObQ39CfralilEQRjH6oAMtNCV1xJyEx5LpRYUVN+EviphDgUc/F3hnYbADmkiNs67Y+3ylmlG7Lnu+FA==",
                "requires": {
                "es5-ext": "^0.10.50",
                  "type": "^1.0.1"
              }
            },
            "damerau-levenshtein": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.5.tgz",
                "integrity": "sha512-CBCRqFnpu715iPmw1KrdOrzRqbdFwQTwAWyyyYS42+iAgHCuXZ+/TdMgQkUENPomxEz9z1BEzuQU2Xw0kUuAgA=="
            },
            "dashdash": {
              "version": "1.14.1",
                "resolved": "https://registry.npmjs.org/dashdash/-/dashdash-1.14.1.tgz",
                "integrity": "sha1-hTz6D3y+L+1d4gMmuN1YEDX24vA=",
                "requires": {
                "assert-plus": "^1.0.0"
              }
            },
            "data-urls": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/data-urls/-/data-urls-1.1.0.tgz",
                "integrity": "sha512-YTWYI9se1P55u58gL5GkQHW4P6VJBJ5iBT+B5a7i2Tjadhv52paJG0qHX4A0OR6/t52odI64KP2YvFpkDOi3eQ==",
                "requires": {
                "abab": "^2.0.0",
                  "whatwg-mimetype": "^2.2.0",
                  "whatwg-url": "^7.0.0"
              },
              "dependencies": {
                "whatwg-url": {
                  "version": "7.1.0",
                    "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.1.0.tgz",
                    "integrity": "sha512-WUu7Rg1DroM7oQvGWfOiAK21n74Gg+T4elXEQYkOhtyLeWiJFoOGLXPKI/9gzIie9CtwVLm8wtw6YJdKyxSjeg==",
                    "requires": {
                    "lodash.sortby": "^4.7.0",
                      "tr46": "^1.0.1",
                      "webidl-conversions": "^4.0.2"
                  }
                }
              }
            },
            "debug": {
              "version": "2.6.9",
                "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
                "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
                "requires": {
                "ms": "2.0.0"
              },
              "dependencies": {
                "ms": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
                    "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
                }
              }
            },
            "debug-log": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/debug-log/-/debug-log-1.0.1.tgz",
                "integrity": "sha1-IwdjLUwEOCuN+KMvcLiVBG1SdF8=",
                "dev": true
            },
            "decamelize": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
                "integrity": "sha1-9lNNFRSCabIDUue+4m9QH5oZEpA="
            },
            "decode-uri-component": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",
                "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU="
            },
            "deep-diff": {
              "version": "0.3.8",
                "resolved": "https://registry.npmjs.org/deep-diff/-/deep-diff-0.3.8.tgz",
                "integrity": "sha1-wB3mPvsO7JeYgB1Ax+Da4ltYLIQ="
            },
            "deep-equal": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-1.1.1.tgz",
                "integrity": "sha512-yd9c5AdiqVcR+JjcwUQb9DkhJc8ngNr0MahEBGvDiJw8puWab2yZlh+nkasOnZP+EGTAP6rRp2JzJhJZzvNF8g==",
                "requires": {
                "is-arguments": "^1.0.4",
                  "is-date-object": "^1.0.1",
                  "is-regex": "^1.0.4",
                  "object-is": "^1.0.1",
                  "object-keys": "^1.1.1",
                  "regexp.prototype.flags": "^1.2.0"
              },
              "dependencies": {
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
                }
              }
            },
            "deep-is": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.3.tgz",
                "integrity": "sha1-s2nW+128E+7PUk+RsHD+7cNXzzQ="
            },
            "default-gateway": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/default-gateway/-/default-gateway-4.2.0.tgz",
                "integrity": "sha512-h6sMrVB1VMWVrW13mSc6ia/DwYYw5MN6+exNu1OaJeFac5aSAvwM7lZ0NVfTABuSkQelr4h5oebg3KB1XPdjgA==",
                "requires": {
                "execa": "^1.0.0",
                  "ip-regex": "^2.1.0"
              }
            },
            "define-properties": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.1.3.tgz",
                "integrity": "sha512-3MqfYKj2lLzdMSf8ZIZE/V+Zuy+BgD6f164e8K2w7dgnpKArBDerGYpM46IYYcjnkdPNMjPk9A6VFB8+3SKlXQ==",
                "requires": {
                "object-keys": "^1.0.12"
              }
            },
            "define-property": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/define-property/-/define-property-2.0.2.tgz",
                "integrity": "sha512-jwK2UV4cnPpbcG7+VRARKTZPUWowwXA8bzH5NP6ud0oeAxyYPuGZUAC7hMugpCdz4BeSZl2Dl9k66CHJ/46ZYQ==",
                "requires": {
                "is-descriptor": "^1.0.2",
                  "isobject": "^3.0.1"
              },
              "dependencies": {
                "is-accessor-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-data-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-descriptor": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                    "is-accessor-descriptor": "^1.0.0",
                      "is-data-descriptor": "^1.0.0",
                      "kind-of": "^6.0.2"
                  }
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "deglob": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/deglob/-/deglob-2.1.1.tgz",
                "integrity": "sha512-2kjwuGGonL7gWE1XU4Fv79+vVzpoQCl0V+boMwWtOQJV2AGDabCwez++nB1Nli/8BabAfZQ/UuHPlp6AymKdWw==",
                "dev": true,
                "requires": {
                "find-root": "^1.0.0",
                  "glob": "^7.0.5",
                  "ignore": "^3.0.9",
                  "pkg-config": "^1.1.0",
                  "run-parallel": "^1.1.2",
                  "uniq": "^1.0.1"
              },
              "dependencies": {
                "ignore": {
                  "version": "3.3.10",
                    "resolved": "https://registry.npmjs.org/ignore/-/ignore-3.3.10.tgz",
                    "integrity": "sha512-Pgs951kaMm5GXP7MOvxERINe3gsaVjUWFm+UZPSq9xYriQAksyhg0csnS0KXSNRD5NmNdapXEpjxG49+AKh/ug==",
                    "dev": true
                }
              }
            },
            "del": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/del/-/del-4.1.1.tgz",
                "integrity": "sha512-QwGuEUouP2kVwQenAsOof5Fv8K9t3D8Ca8NxcXKrIpEHjTXK5J2nXLdP+ALI1cgv8wj7KuwBhTwBkOZSJKM5XQ==",
                "requires": {
                "@types/glob": "^7.1.1",
                  "globby": "^6.1.0",
                  "is-path-cwd": "^2.0.0",
                  "is-path-in-cwd": "^2.0.0",
                  "p-map": "^2.0.0",
                  "pify": "^4.0.1",
                  "rimraf": "^2.6.3"
              },
              "dependencies": {
                "globby": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/globby/-/globby-6.1.0.tgz",
                    "integrity": "sha1-9abXDoOV4hyFj7BInWTfAkJNUGw=",
                    "requires": {
                    "array-union": "^1.0.1",
                      "glob": "^7.0.3",
                      "object-assign": "^4.0.1",
                      "pify": "^2.0.0",
                      "pinkie-promise": "^2.0.0"
                  },
                  "dependencies": {
                    "pify": {
                      "version": "2.3.0",
                        "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                        "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw="
                    }
                  }
                },
                "p-map": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/p-map/-/p-map-2.1.0.tgz",
                    "integrity": "sha512-y3b8Kpd8OAN444hxfBbFfj1FY/RjtTd8tzYwhUqNYXx0fXx2iX4maP4Qr6qhIKbQXI02wTLAda4fYUbDagTUFw=="
                },
                "pify": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
                    "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
                }
              }
            },
            "delayed-stream": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
                "integrity": "sha1-3zrhmayt+31ECqrgsp4icrJOxhk="
            },
            "delegates": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/delegates/-/delegates-1.0.0.tgz",
                "integrity": "sha1-hMbhWbgZBP3KWaDvRM2HDTElD5o="
            },
            "depd": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",
                "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak="
            },
            "des.js": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/des.js/-/des.js-1.0.1.tgz",
                "integrity": "sha512-Q0I4pfFrv2VPd34/vfLrFOoRmlYj3OV50i7fskps1jZWK1kApMWWT9G6RRUeYedLcBDIhnSDaUvJMb3AhUlaEA==",
                "requires": {
                "inherits": "^2.0.1",
                  "minimalistic-assert": "^1.0.0"
              }
            },
            "destroy": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.0.4.tgz",
                "integrity": "sha1-l4hXRCxEdJ5CBmE+N5RiBYJqvYA="
            },
            "detect-indent": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/detect-indent/-/detect-indent-4.0.0.tgz",
                "integrity": "sha1-920GQ1LN9Docts5hnE7jqUdd4gg=",
                "dev": true,
                "requires": {
                "repeating": "^2.0.0"
              }
            },
            "detect-newline": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/detect-newline/-/detect-newline-2.1.0.tgz",
                "integrity": "sha1-9B8cEL5LAOh7XxPaaAdZ8sW/0+I="
            },
            "detect-node": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/detect-node/-/detect-node-2.0.4.tgz",
                "integrity": "sha512-ZIzRpLJrOj7jjP2miAtgqIfmzbxa4ZOr5jJc601zklsfEx9oTzmmj2nVpIPRpNlRTIh8lc1kyViIY7BWSGNmKw=="
            },
            "detect-port-alt": {
              "version": "1.1.6",
                "resolved": "https://registry.npmjs.org/detect-port-alt/-/detect-port-alt-1.1.6.tgz",
                "integrity": "sha512-5tQykt+LqfJFBEYaDITx7S7cR7mJ/zQmLXZ2qt5w04ainYZw6tBf9dBunMjVeVOdYVRUzUOE4HkY5J7+uttb5Q==",
                "requires": {
                "address": "^1.0.1",
                  "debug": "^2.6.0"
              }
            },
            "diff-sequences": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/diff-sequences/-/diff-sequences-24.9.0.tgz",
                "integrity": "sha512-Dj6Wk3tWyTE+Fo1rW8v0Xhwk80um6yFYKbuAxc9c3EZxIHFDYwbi34Uk42u1CdnIiVorvt4RmlSDjIPyzGC2ew=="
            },
            "diffie-hellman": {
              "version": "5.0.3",
                "resolved": "https://registry.npmjs.org/diffie-hellman/-/diffie-hellman-5.0.3.tgz",
                "integrity": "sha512-kqag/Nl+f3GwyK25fhUMYj81BUOrZ9IuJsjIcDE5icNM9FJHAVm3VcUDxdLPoQtTuUylWm6ZIknYJwwaPxsUzg==",
                "requires": {
                "bn.js": "^4.1.0",
                  "miller-rabin": "^4.0.0",
                  "randombytes": "^2.0.0"
              }
            },
            "dir-glob": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-2.0.0.tgz",
                "integrity": "sha512-37qirFDz8cA5fimp9feo43fSuRo2gHwaIn6dXL8Ber1dGwUosDrGZeCCXq57WnIqE4aQ+u3eQZzsk1yOzhdwag==",
                "requires": {
                "arrify": "^1.0.1",
                  "path-type": "^3.0.0"
              },
              "dependencies": {
                "path-type": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/path-type/-/path-type-3.0.0.tgz",
                    "integrity": "sha512-T2ZUsdZFHgA3u4e5PfPbjd7HDDpxPnQb5jN0SrDsjNSuVXHJqtwTnWqG0B1jZrgmJ/7lj1EmVIByWt1gxGkWvg==",
                    "requires": {
                    "pify": "^3.0.0"
                  }
                },
                "pify": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
                    "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
                }
              }
            },
            "dns-equal": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/dns-equal/-/dns-equal-1.0.0.tgz",
                "integrity": "sha1-s55/HabrCnW6nBcySzR1PEfgZU0="
            },
            "dns-packet": {
              "version": "1.3.1",
                "resolved": "https://registry.npmjs.org/dns-packet/-/dns-packet-1.3.1.tgz",
                "integrity": "sha512-0UxfQkMhYAUaZI+xrNZOz/as5KgDU0M/fQ9b6SpkyLbk3GEswDi6PADJVaYJradtRVsRIlF1zLyOodbcTCDzUg==",
                "requires": {
                "ip": "^1.1.0",
                  "safe-buffer": "^5.0.1"
              }
            },
            "dns-txt": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/dns-txt/-/dns-txt-2.0.2.tgz",
                "integrity": "sha1-uR2Ab10nGI5Ks+fRB9iBocxGQrY=",
                "requires": {
                "buffer-indexof": "^1.0.0"
              }
            },
            "doctrine": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
                "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
                "dev": true,
                "requires": {
                "esutils": "^2.0.2"
              }
            },
            "dom-align": {
              "version": "1.10.4",
                "resolved": "https://registry.npmjs.org/dom-align/-/dom-align-1.10.4.tgz",
                "integrity": "sha512-wytDzaru67AmqFOY4B9GUb/hrwWagezoYYK97D/vpK+ezg+cnuZO0Q2gltUPa7KfNmIqfRIYVCF8UhRDEHAmgQ=="
            },
            "dom-closest": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/dom-closest/-/dom-closest-0.2.0.tgz",
                "integrity": "sha1-69n5HRvyLo1vR3h2u80+yQIWwM8=",
                "requires": {
                "dom-matches": ">=1.0.1"
              }
            },
            "dom-converter": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/dom-converter/-/dom-converter-0.2.0.tgz",
                "integrity": "sha512-gd3ypIPfOMr9h5jIKq8E3sHOTCjeirnl0WK5ZdS1AW0Odt0b1PaWaHdJ4Qk4klv+YB9aJBS7mESXjFoDQPu6DA==",
                "requires": {
                "utila": "~0.4"
              }
            },
            "dom-matches": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/dom-matches/-/dom-matches-2.0.0.tgz",
                "integrity": "sha1-0nKLQWqHUzmA6wibhI0lPPI6dYw="
            },
            "dom-scroll-into-view": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/dom-scroll-into-view/-/dom-scroll-into-view-1.2.1.tgz",
                "integrity": "sha1-6PNnMt0ImwIBqI14Fdw/iObWbH4="
            },
            "dom-serializer": {
              "version": "0.2.2",
                "resolved": "https://registry.npmjs.org/dom-serializer/-/dom-serializer-0.2.2.tgz",
                "integrity": "sha512-2/xPb3ORsQ42nHYiSunXkDjPLBaEj/xTwUO4B7XCZQTRk7EBtTOPaygh10YAAh2OI1Qrp6NWfpAhzswj0ydt9g==",
                "requires": {
                "domelementtype": "^2.0.1",
                  "entities": "^2.0.0"
              },
              "dependencies": {
                "domelementtype": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-2.0.1.tgz",
                    "integrity": "sha512-5HOHUDsYZWV8FGWN0Njbr/Rn7f/eWSQi1v7+HsUVwXgn8nWWlL64zKDkS0n8ZmQ3mlWOMuXOnR+7Nx/5tMO5AQ=="
                }
              }
            },
            "domain-browser": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/domain-browser/-/domain-browser-1.2.0.tgz",
                "integrity": "sha512-jnjyiM6eRyZl2H+W8Q/zLMA481hzi0eszAaBUzIVnmYVDBbnLxVNnfu1HgEBvCbL+71FrxMl3E6lpKH7Ge3OXA=="
            },
            "domelementtype": {
              "version": "1.3.1",
                "resolved": "https://registry.npmjs.org/domelementtype/-/domelementtype-1.3.1.tgz",
                "integrity": "sha512-BSKB+TSpMpFI/HOxCNr1O8aMOTZ8hT3pM3GQ0w/mWRmkhEDSFJkkyzz4XQsBV44BChwGkrDfMyjVD0eA2aFV3w=="
            },
            "domexception": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/domexception/-/domexception-1.0.1.tgz",
                "integrity": "sha512-raigMkn7CJNNo6Ihro1fzG7wr3fHuYVytzquZKX5n0yizGsTcYgzdIUwj1X9pK0VvjeihV+XiclP+DjwbsSKug==",
                "requires": {
                "webidl-conversions": "^4.0.2"
              }
            },
            "domhandler": {
              "version": "2.4.2",
                "resolved": "https://registry.npmjs.org/domhandler/-/domhandler-2.4.2.tgz",
                "integrity": "sha512-JiK04h0Ht5u/80fdLMCEmV4zkNh2BcoMFBmZ/91WtYZ8qVXSKjiw7fXMgFPnHcSZgOo3XdinHvmnDUeMf5R4wA==",
                "requires": {
                "domelementtype": "1"
              }
            },
            "domutils": {
              "version": "1.7.0",
                "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.7.0.tgz",
                "integrity": "sha512-Lgd2XcJ/NjEw+7tFvfKxOzCYKZsdct5lczQ2ZaQY8Djz7pfAD3Gbp8ySJWtreII/vDlMVmxwa6pHmdxIYgttDg==",
                "requires": {
                "dom-serializer": "0",
                  "domelementtype": "1"
              }
            },
            "dot-prop": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-4.2.0.tgz",
                "integrity": "sha512-tUMXrxlExSW6U2EXiiKGSBVdYgtV8qlHL+C10TsW4PURY/ic+eaysnSkwB4kA/mBlCyy/IKDJ+Lc3wbWeaXtuQ==",
                "requires": {
                "is-obj": "^1.0.0"
              }
            },
            "dotenv": {
              "version": "8.2.0",
                "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-8.2.0.tgz",
                "integrity": "sha512-8sJ78ElpbDJBHNeBzUbUVLsqKdccaa/BXF1uPTw3GrvQTBgrQrtObr2mUrE38vzYd8cEv+m/JBfDLioYcfXoaw=="
            },
            "dotenv-expand": {
              "version": "5.1.0",
                "resolved": "https://registry.npmjs.org/dotenv-expand/-/dotenv-expand-5.1.0.tgz",
                "integrity": "sha512-YXQl1DSa4/PQyRfgrv6aoNjhasp/p4qs9FjJ4q4cQk+8m4r6k4ZSiEyytKG8f8W9gi8WsQtIObNmKd+tMzNTmA=="
            },
            "draft-js": {
              "version": "0.10.5",
                "resolved": "https://registry.npmjs.org/draft-js/-/draft-js-0.10.5.tgz",
                "integrity": "sha512-LE6jSCV9nkPhfVX2ggcRLA4FKs6zWq9ceuO/88BpXdNCS7mjRTgs0NsV6piUCJX9YxMsB9An33wnkMmU2sD2Zg==",
                "requires": {
                "fbjs": "^0.8.15",
                  "immutable": "~3.7.4",
                  "object-assign": "^4.1.0"
              }
            },
            "duplexer": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.1.tgz",
                "integrity": "sha1-rOb/gIwc5mtX0ev5eXessCM0z8E="
            },
            "duplexify": {
              "version": "3.7.1",
                "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-3.7.1.tgz",
                "integrity": "sha512-07z8uv2wMyS51kKhD1KsdXJg5WQ6t93RneqRxUHnskXVtlYYkLqM0gqStQZ3pj073g687jPCHrqNfCzawLYh5g==",
                "requires": {
                "end-of-stream": "^1.0.0",
                  "inherits": "^2.0.1",
                  "readable-stream": "^2.0.0",
                  "stream-shift": "^1.0.0"
              }
            },
            "ecc-jsbn": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/ecc-jsbn/-/ecc-jsbn-0.1.2.tgz",
                "integrity": "sha1-OoOpBOVDUyh4dMVkt1SThoSamMk=",
                "requires": {
                "jsbn": "~0.1.0",
                  "safer-buffer": "^2.1.0"
              }
            },
            "ee-first": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
                "integrity": "sha1-WQxhFWsK4vTwJVcyoViyZrxWsh0="
            },
            "electron-to-chromium": {
              "version": "1.3.331",
                "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.3.331.tgz",
                "integrity": "sha512-GuDv5gkxwRROYnmIVFUohoyrNapWCKLNn80L7Pa+9WRF/oY4t7XLH7wBMsYBgIRwi8BvEvsGKLKh8kOciOp6kA=="
            },
            "elliptic": {
              "version": "6.5.2",
                "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.2.tgz",
                "integrity": "sha512-f4x70okzZbIQl/NSRLkI/+tteV/9WqL98zx+SQ69KbXxmVrmjwsNUPn/gYJJ0sHvEak24cZgHIPegRePAtA/xw==",
                "requires": {
                "bn.js": "^4.4.0",
                  "brorand": "^1.0.1",
                  "hash.js": "^1.0.0",
                  "hmac-drbg": "^1.0.0",
                  "inherits": "^2.0.1",
                  "minimalistic-assert": "^1.0.0",
                  "minimalistic-crypto-utils": "^1.0.0"
              }
            },
            "emoji-regex": {
              "version": "8.0.0",
                "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
                "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
            },
            "emojis-list": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/emojis-list/-/emojis-list-2.1.0.tgz",
                "integrity": "sha1-TapNnbAPmBmIDHn6RXrlsJof04k="
            },
            "encodeurl": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
                "integrity": "sha1-rT/0yG7C0CkyL1oCw6mmBslbP1k="
            },
            "encoding": {
              "version": "0.1.12",
                "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.12.tgz",
                "integrity": "sha1-U4tm8+5izRq1HsMjgp0flIDHS+s=",
                "requires": {
                "iconv-lite": "~0.4.13"
              }
            },
            "end-of-stream": {
              "version": "1.4.4",
                "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
                "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
                "requires": {
                "once": "^1.4.0"
              }
            },
            "enhanced-resolve": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-4.1.1.tgz",
                "integrity": "sha512-98p2zE+rL7/g/DzMHMTF4zZlCgeVdJ7yr6xzEpJRYwFYrGi9ANdn5DnJURg6RpBkyk60XYDnWIv51VfIhfNGuA==",
                "requires": {
                "graceful-fs": "^4.1.2",
                  "memory-fs": "^0.5.0",
                  "tapable": "^1.0.0"
              },
              "dependencies": {
                "memory-fs": {
                  "version": "0.5.0",
                    "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.5.0.tgz",
                    "integrity": "sha512-jA0rdU5KoQMC0e6ppoNRtpp6vjFq6+NY7r8hywnC7V+1Xj/MtHwGIbB1QaK/dunyjWteJzmkpd7ooeWg10T7GA==",
                    "requires": {
                    "errno": "^0.1.3",
                      "readable-stream": "^2.0.1"
                  }
                }
              }
            },
            "enquire.js": {
              "version": "2.1.6",
                "resolved": "https://registry.npmjs.org/enquire.js/-/enquire.js-2.1.6.tgz",
                "integrity": "sha1-PoeAybi4NQhMP2DhZtvDwqPImBQ="
            },
            "entities": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/entities/-/entities-2.0.0.tgz",
                "integrity": "sha512-D9f7V0JSRwIxlRI2mjMqufDrRDnx8p+eEOz7aUM9SuvF8gsBzra0/6tbjl1m8eQHrZlYj6PxqE00hZ1SAIKPLw=="
            },
            "errno": {
              "version": "0.1.7",
                "resolved": "https://registry.npmjs.org/errno/-/errno-0.1.7.tgz",
                "integrity": "sha512-MfrRBDWzIWifgq6tJj60gkAwtLNb6sQPlcFrSOflcP1aFmmruKQ2wRnze/8V6kgyz7H3FF8Npzv78mZ7XLLflg==",
                "requires": {
                "prr": "~1.0.1"
              }
            },
            "error-ex": {
              "version": "1.3.2",
                "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.2.tgz",
                "integrity": "sha512-7dFHNmqeFSEt2ZBsCriorKnn3Z2pj+fd9kmI6QoWw4//DL+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g==",
                "requires": {
                "is-arrayish": "^0.2.1"
              }
            },
            "es-abstract": {
              "version": "1.12.0",
                "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.12.0.tgz",
                "integrity": "sha512-C8Fx/0jFmV5IPoMOFPA9P9G5NtqW+4cOPit3MIuvR2t7Ag2K15EJTpxnHAYTzL+aYQJIESYeXZmDBfOBE1HcpA==",
                "requires": {
                "es-to-primitive": "^1.1.1",
                  "function-bind": "^1.1.1",
                  "has": "^1.0.1",
                  "is-callable": "^1.1.3",
                  "is-regex": "^1.0.4"
              }
            },
            "es-to-primitive": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",
                "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",
                "requires": {
                "is-callable": "^1.1.4",
                  "is-date-object": "^1.0.1",
                  "is-symbol": "^1.0.2"
              }
            },
            "es5-ext": {
              "version": "0.10.53",
                "resolved": "https://registry.npmjs.org/es5-ext/-/es5-ext-0.10.53.tgz",
                "integrity": "sha512-Xs2Stw6NiNHWypzRTY1MtaG/uJlwCk8kH81920ma8mvN8Xq1gsfhZvpkImLQArw8AHnv8MT2I45J3c0R8slE+Q==",
                "requires": {
                "es6-iterator": "~2.0.3",
                  "es6-symbol": "~3.1.3",
                  "next-tick": "~1.0.0"
              }
            },
            "es6-iterator": {
              "version": "2.0.3",
                "resolved": "https://registry.npmjs.org/es6-iterator/-/es6-iterator-2.0.3.tgz",
                "integrity": "sha1-p96IkUGgWpSwhUQDstCg+/qY87c=",
                "requires": {
                "d": "1",
                  "es5-ext": "^0.10.35",
                  "es6-symbol": "^3.1.1"
              }
            },
            "es6-symbol": {
              "version": "3.1.3",
                "resolved": "https://registry.npmjs.org/es6-symbol/-/es6-symbol-3.1.3.tgz",
                "integrity": "sha512-NJ6Yn3FuDinBaBRWl/q5X/s4koRHBrgKAu+yGI6JCBeiu3qrcbJhwT2GeR/EXVfylRk8dpQVJoLEFhK+Mu31NA==",
                "requires": {
                "d": "^1.0.1",
                  "ext": "^1.1.2"
              }
            },
            "escape-html": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
                "integrity": "sha1-Aljq5NPQwJdN4cFpGI7wBR0dGYg="
            },
            "escape-string-regexp": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
                "integrity": "sha1-G2HAViGQqN/2rjuyzwIAyhMLhtQ="
            },
            "escodegen": {
              "version": "1.12.1",
                "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.12.1.tgz",
                "integrity": "sha512-Q8t2YZ+0e0pc7NRVj3B4tSQ9rim1oi4Fh46k2xhJ2qOiEwhQfdjyEQddWdj7ZFaKmU+5104vn1qrcjEPWq+bgQ==",
                "requires": {
                "esprima": "^3.1.3",
                  "estraverse": "^4.2.0",
                  "esutils": "^2.0.2",
                  "optionator": "^0.8.1",
                  "source-map": "~0.6.1"
              },
              "dependencies": {
                "esprima": {
                  "version": "3.1.3",
                    "resolved": "https://registry.npmjs.org/esprima/-/esprima-3.1.3.tgz",
                    "integrity": "sha1-/cpRzuYTOJXjyI1TXOSdv/YqRjM="
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
                    "optional": true
                }
              }
            },
            "eslint": {
              "version": "6.8.0",
                "resolved": "https://registry.npmjs.org/eslint/-/eslint-6.8.0.tgz",
                "integrity": "sha512-K+Iayyo2LtyYhDSYwz5D5QdWw0hCacNzyq1Y821Xna2xSJj7cijoLLYmLxTQgcgZ9mC61nryMy9S7GRbYpI5Ig==",
                "dev": true,
                "requires": {
                "@babel/code-frame": "^7.0.0",
                  "ajv": "^6.10.0",
                  "chalk": "^2.1.0",
                  "cross-spawn": "^6.0.5",
                  "debug": "^4.0.1",
                  "doctrine": "^3.0.0",
                  "eslint-scope": "^5.0.0",
                  "eslint-utils": "^1.4.3",
                  "eslint-visitor-keys": "^1.1.0",
                  "espree": "^6.1.2",
                  "esquery": "^1.0.1",
                  "esutils": "^2.0.2",
                  "file-entry-cache": "^5.0.1",
                  "functional-red-black-tree": "^1.0.1",
                  "glob-parent": "^5.0.0",
                  "globals": "^12.1.0",
                  "ignore": "^4.0.6",
                  "import-fresh": "^3.0.0",
                  "imurmurhash": "^0.1.4",
                  "inquirer": "^7.0.0",
                  "is-glob": "^4.0.0",
                  "js-yaml": "^3.13.1",
                  "json-stable-stringify-without-jsonify": "^1.0.1",
                  "levn": "^0.3.0",
                  "lodash": "^4.17.14",
                  "minimatch": "^3.0.4",
                  "mkdirp": "^0.5.1",
                  "natural-compare": "^1.4.0",
                  "optionator": "^0.8.3",
                  "progress": "^2.0.0",
                  "regexpp": "^2.0.1",
                  "semver": "^6.1.2",
                  "strip-ansi": "^5.2.0",
                  "strip-json-comments": "^3.0.1",
                  "table": "^5.2.3",
                  "text-table": "^0.2.0",
                  "v8-compile-cache": "^2.0.3"
              },
              "dependencies": {
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "dev": true,
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "eslint-scope": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.0.0.tgz",
                    "integrity": "sha512-oYrhJW7S0bxAFDvWqzvMPRm6pcgcnWc4QnofCAqRTRfQC0JcwenzGglTtsLyIuuWFfkqDG9vz67cnttSd53djw==",
                    "dev": true,
                    "requires": {
                    "esrecurse": "^4.1.0",
                      "estraverse": "^4.1.1"
                  }
                },
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A==",
                    "dev": true
                },
                "globals": {
                  "version": "12.3.0",
                    "resolved": "https://registry.npmjs.org/globals/-/globals-12.3.0.tgz",
                    "integrity": "sha512-wAfjdLgFsPZsklLJvOBUBmzYE8/CwhEqSBEMRXA3qxIiNtyqvjYurAtIfDh6chlEPUfmTY3MnZh5Hfh4q0UlIw==",
                    "dev": true,
                    "requires": {
                    "type-fest": "^0.8.1"
                  }
                },
                "import-fresh": {
                  "version": "3.2.1",
                    "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.2.1.tgz",
                    "integrity": "sha512-6e1q1cnWP2RXD9/keSkxHScg508CdXqXWgWBaETNhyuBFz+kUZlKboh+ISK+bU++DmbHimVBrOz/zzPe0sZ3sQ==",
                    "dev": true,
                    "requires": {
                    "parent-module": "^1.0.0",
                      "resolve-from": "^4.0.0"
                  }
                },
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI=",
                    "dev": true
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "dev": true,
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                },
                "optionator": {
                  "version": "0.8.3",
                    "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
                    "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
                    "dev": true,
                    "requires": {
                    "deep-is": "~0.1.3",
                      "fast-levenshtein": "~2.0.6",
                      "levn": "~0.3.0",
                      "prelude-ls": "~1.1.2",
                      "type-check": "~0.3.2",
                      "word-wrap": "~1.2.3"
                  }
                },
                "resolve-from": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
                    "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
                    "dev": true
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==",
                    "dev": true
                },
                "strip-json-comments": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.0.1.tgz",
                    "integrity": "sha512-VTyMAUfdm047mwKl+u79WIdrZxtFtn+nBxHeb844XBQ9uMNTuTHdx2hc5RiAJYqwTj3wc/xe5HLSdJSkJ+WfZw==",
                    "dev": true
                }
              }
            },
            "eslint-config-react-app": {
              "version": "5.1.0",
                "resolved": "https://registry.npmjs.org/eslint-config-react-app/-/eslint-config-react-app-5.1.0.tgz",
                "integrity": "sha512-hBaxisHC6HXRVvxX+/t1n8mOdmCVIKgkXsf2WoUkJi7upHJTwYTsdCmx01QPOjKNT34QMQQ9sL0tVBlbiMFjxA==",
                "requires": {
                "confusing-browser-globals": "^1.0.9"
              }
            },
            "eslint-config-standard": {
              "version": "12.0.0",
                "resolved": "https://registry.npmjs.org/eslint-config-standard/-/eslint-config-standard-12.0.0.tgz",
                "integrity": "sha512-COUz8FnXhqFitYj4DTqHzidjIL/t4mumGZto5c7DrBpvWoie+Sn3P4sLEzUGeYhRElWuFEf8K1S1EfvD1vixCQ==",
                "dev": true
            },
            "eslint-config-standard-jsx": {
              "version": "6.0.2",
                "resolved": "https://registry.npmjs.org/eslint-config-standard-jsx/-/eslint-config-standard-jsx-6.0.2.tgz",
                "integrity": "sha512-D+YWAoXw+2GIdbMBRAzWwr1ZtvnSf4n4yL0gKGg7ShUOGXkSOLerI17K4F6LdQMJPNMoWYqepzQD/fKY+tXNSg==",
                "dev": true
            },
            "eslint-config-standard-react": {
              "version": "7.0.2",
                "resolved": "https://registry.npmjs.org/eslint-config-standard-react/-/eslint-config-standard-react-7.0.2.tgz",
                "integrity": "sha512-Zv/vubIfrwx4IbRXAggRjaswLXKdfFeuGfN365cVTaRmfpAy/7dIxMvJRZkUT99zEx8FOjTXL0KC4psfDjK/+w==",
                "dev": true,
                "requires": {
                "eslint-config-standard-jsx": "^6.0.1"
              }
            },
            "eslint-import-resolver-node": {
              "version": "0.3.2",
                "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.2.tgz",
                "integrity": "sha512-sfmTqJfPSizWu4aymbPr4Iidp5yKm8yDkHp+Ir3YiTHiiDfxh69mOUsmiqW6RZ9zRXFaF64GtYmN7e+8GHBv6Q==",
                "requires": {
                "debug": "^2.6.9",
                  "resolve": "^1.5.0"
              }
            },
            "eslint-loader": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/eslint-loader/-/eslint-loader-3.0.2.tgz",
                "integrity": "sha512-S5VnD+UpVY1PyYRqeBd/4pgsmkvSokbHqTXAQMpvCyRr3XN2tvSLo9spm2nEpqQqh9dezw3os/0zWihLeOg2Rw==",
                "requires": {
                "fs-extra": "^8.1.0",
                  "loader-fs-cache": "^1.0.2",
                  "loader-utils": "^1.2.3",
                  "object-hash": "^1.3.1",
                  "schema-utils": "^2.2.0"
              }
            },
            "eslint-module-utils": {
              "version": "2.4.0",
                "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.4.0.tgz",
                "integrity": "sha512-14tltLm38Eu3zS+mt0KvILC3q8jyIAH518MlG+HO0p+yK885Lb1UHTY/UgR91eOyGdmxAPb+OLoW4znqIT6Ndw==",
                "requires": {
                "debug": "^2.6.8",
                  "pkg-dir": "^2.0.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "requires": {
                    "locate-path": "^2.0.0"
                  }
                },
                "locate-path": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "requires": {
                    "p-locate": "^2.0.0",
                      "path-exists": "^3.0.0"
                  }
                },
                "p-limit": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "requires": {
                    "p-try": "^1.0.0"
                  }
                },
                "p-locate": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "requires": {
                    "p-limit": "^1.1.0"
                  }
                },
                "p-try": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M="
                },
                "pkg-dir": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
                    "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
                    "requires": {
                    "find-up": "^2.1.0"
                  }
                }
              }
            },
            "eslint-plugin-es": {
              "version": "1.4.1",
                "resolved": "https://registry.npmjs.org/eslint-plugin-es/-/eslint-plugin-es-1.4.1.tgz",
                "integrity": "sha512-5fa/gR2yR3NxQf+UXkeLeP8FBBl6tSgdrAz1+cF84v1FMM4twGwQoqTnn+QxFLcPOrF4pdKEJKDB/q9GoyJrCA==",
                "dev": true,
                "requires": {
                "eslint-utils": "^1.4.2",
                  "regexpp": "^2.0.1"
              }
            },
            "eslint-plugin-flowtype": {
              "version": "3.13.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-flowtype/-/eslint-plugin-flowtype-3.13.0.tgz",
                "integrity": "sha512-bhewp36P+t7cEV0b6OdmoRWJCBYRiHFlqPZAG1oS3SF+Y0LQkeDvFSM4oxoxvczD1OdONCXMlJfQFiWLcV9urw==",
                "requires": {
                "lodash": "^4.17.15"
              }
            },
            "eslint-plugin-import": {
              "version": "2.20.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.20.0.tgz",
                "integrity": "sha512-NK42oA0mUc8Ngn4kONOPsPB1XhbUvNHqF+g307dPV28aknPoiNnKLFd9em4nkswwepdF5ouieqv5Th/63U7YJQ==",
                "dev": true,
                "requires": {
                "array-includes": "^3.0.3",
                  "array.prototype.flat": "^1.2.1",
                  "contains-path": "^0.1.0",
                  "debug": "^2.6.9",
                  "doctrine": "1.5.0",
                  "eslint-import-resolver-node": "^0.3.2",
                  "eslint-module-utils": "^2.4.1",
                  "has": "^1.0.3",
                  "minimatch": "^3.0.4",
                  "object.values": "^1.1.0",
                  "read-pkg-up": "^2.0.0",
                  "resolve": "^1.12.0"
              },
              "dependencies": {
                "doctrine": {
                  "version": "1.5.0",
                    "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
                    "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
                    "dev": true,
                    "requires": {
                    "esutils": "^2.0.2",
                      "isarray": "^1.0.0"
                  }
                },
                "eslint-module-utils": {
                  "version": "2.5.1",
                    "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.5.1.tgz",
                    "integrity": "sha512-GcNwsYv8MfoEBSbAmV+PSVn2RlhpCShbLImtNviAYa/LE0PgNqxH5tLi1Ld9yeFwdjHsarXK+7G9vsyddmB6dw==",
                    "dev": true,
                    "requires": {
                    "debug": "^2.6.9",
                      "pkg-dir": "^2.0.0"
                  }
                },
                "find-up": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "dev": true,
                    "requires": {
                    "locate-path": "^2.0.0"
                  }
                },
                "locate-path": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "dev": true,
                    "requires": {
                    "p-locate": "^2.0.0",
                      "path-exists": "^3.0.0"
                  }
                },
                "p-limit": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "dev": true,
                    "requires": {
                    "p-try": "^1.0.0"
                  }
                },
                "p-locate": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "dev": true,
                    "requires": {
                    "p-limit": "^1.1.0"
                  }
                },
                "p-try": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
                    "dev": true
                },
                "pkg-dir": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-2.0.0.tgz",
                    "integrity": "sha1-9tXREJ4Z1j7fQo4L1X4Sd3YVM0s=",
                    "dev": true,
                    "requires": {
                    "find-up": "^2.1.0"
                  }
                },
                "resolve": {
                  "version": "1.14.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.14.2.tgz",
                    "integrity": "sha512-EjlOBLBO1kxsUxsKjLt7TAECyKW6fOh1VRkykQkKGzcBbjjPIxBqGh0jf7GJ3k/f5mxMqW3htMD3WdTUVtW8HQ==",
                    "dev": true,
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                }
              }
            },
            "eslint-plugin-jsx-a11y": {
              "version": "6.2.3",
                "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.2.3.tgz",
                "integrity": "sha512-CawzfGt9w83tyuVekn0GDPU9ytYtxyxyFZ3aSWROmnRRFQFT2BiPJd7jvRdzNDi6oLWaS2asMeYSNMjWTV4eNg==",
                "requires": {
                "@babel/runtime": "^7.4.5",
                  "aria-query": "^3.0.0",
                  "array-includes": "^3.0.3",
                  "ast-types-flow": "^0.0.7",
                  "axobject-query": "^2.0.2",
                  "damerau-levenshtein": "^1.0.4",
                  "emoji-regex": "^7.0.2",
                  "has": "^1.0.3",
                  "jsx-ast-utils": "^2.2.1"
              },
              "dependencies": {
                "emoji-regex": {
                  "version": "7.0.3",
                    "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
                    "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
                }
              }
            },
            "eslint-plugin-node": {
              "version": "9.1.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-node/-/eslint-plugin-node-9.1.0.tgz",
                "integrity": "sha512-ZwQYGm6EoV2cfLpE1wxJWsfnKUIXfM/KM09/TlorkukgCAwmkgajEJnPCmyzoFPQQkmvo5DrW/nyKutNIw36Mw==",
                "dev": true,
                "requires": {
                "eslint-plugin-es": "^1.4.0",
                  "eslint-utils": "^1.3.1",
                  "ignore": "^5.1.1",
                  "minimatch": "^3.0.4",
                  "resolve": "^1.10.1",
                  "semver": "^6.1.0"
              },
              "dependencies": {
                "ignore": {
                  "version": "5.1.4",
                    "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.1.4.tgz",
                    "integrity": "sha512-MzbUSahkTW1u7JpKKjY7LCARd1fU5W2rLdxlM4kdkayuCwZImjkpluF9CM1aLewYJguPDqewLam18Y6AU69A8A==",
                    "dev": true
                },
                "resolve": {
                  "version": "1.14.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.14.2.tgz",
                    "integrity": "sha512-EjlOBLBO1kxsUxsKjLt7TAECyKW6fOh1VRkykQkKGzcBbjjPIxBqGh0jf7GJ3k/f5mxMqW3htMD3WdTUVtW8HQ==",
                    "dev": true,
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==",
                    "dev": true
                }
              }
            },
            "eslint-plugin-promise": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/eslint-plugin-promise/-/eslint-plugin-promise-4.1.1.tgz",
                "integrity": "sha512-faAHw7uzlNPy7b45J1guyjazw28M+7gJokKUjC5JSFoYfUEyy6Gw/i7YQvmv2Yk00sUjWcmzXQLpU1Ki/C2IZQ==",
                "dev": true
            },
            "eslint-plugin-react": {
              "version": "7.16.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.16.0.tgz",
                "integrity": "sha512-GacBAATewhhptbK3/vTP09CbFrgUJmBSaaRcWdbQLFvUZy9yVcQxigBNHGPU/KE2AyHpzj3AWXpxoMTsIDiHug==",
                "requires": {
                "array-includes": "^3.0.3",
                  "doctrine": "^2.1.0",
                  "has": "^1.0.3",
                  "jsx-ast-utils": "^2.2.1",
                  "object.entries": "^1.1.0",
                  "object.fromentries": "^2.0.0",
                  "object.values": "^1.1.0",
                  "prop-types": "^15.7.2",
                  "resolve": "^1.12.0"
              },
              "dependencies": {
                "doctrine": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
                    "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
                    "requires": {
                    "esutils": "^2.0.2"
                  }
                },
                "resolve": {
                  "version": "1.14.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.14.2.tgz",
                    "integrity": "sha512-EjlOBLBO1kxsUxsKjLt7TAECyKW6fOh1VRkykQkKGzcBbjjPIxBqGh0jf7GJ3k/f5mxMqW3htMD3WdTUVtW8HQ==",
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                }
              }
            },
            "eslint-plugin-react-hooks": {
              "version": "1.7.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-1.7.0.tgz",
                "integrity": "sha512-iXTCFcOmlWvw4+TOE8CLWj6yX1GwzT0Y6cUfHHZqWnSk144VmVIRcVGtUAzrLES7C798lmvnt02C7rxaOX1HNA=="
            },
            "eslint-plugin-standard": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/eslint-plugin-standard/-/eslint-plugin-standard-4.0.0.tgz",
                "integrity": "sha512-OwxJkR6TQiYMmt1EsNRMe5qG3GsbjlcOhbGUBY4LtavF9DsLaTcoR+j2Tdjqi23oUwKNUqX7qcn5fPStafMdlA==",
                "dev": true
            },
            "eslint-scope": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-4.0.3.tgz",
                "integrity": "sha512-p7VutNr1O/QrxysMo3E45FjYDTeXBy0iTltPFNSqKAIfjDSXC+4dj+qfyuD8bfAXrW/y6lW3O76VaYNPKfpKrg==",
                "requires": {
                "esrecurse": "^4.1.0",
                  "estraverse": "^4.1.1"
              }
            },
            "eslint-utils": {
              "version": "1.4.3",
                "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-1.4.3.tgz",
                "integrity": "sha512-fbBN5W2xdY45KulGXmLHZ3c3FHfVYmKg0IrAKGOkT/464PQsx2UeIzfz1RmEci+KLm1bBaAzZAh8+/E+XAeZ8Q==",
                "dev": true,
                "requires": {
                "eslint-visitor-keys": "^1.1.0"
              },
              "dependencies": {
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A==",
                    "dev": true
                }
              }
            },
            "eslint-visitor-keys": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.0.0.tgz",
                "integrity": "sha512-qzm/XxIbxm/FHyH341ZrbnMUpe+5Bocte9xkmFMzPMjRaZMcXww+MpBptFvtU+79L362nqiLhekCxCxDPaUMBQ=="
            },
            "espree": {
              "version": "6.1.2",
                "resolved": "https://registry.npmjs.org/espree/-/espree-6.1.2.tgz",
                "integrity": "sha512-2iUPuuPP+yW1PZaMSDM9eyVf8D5P0Hi8h83YtZ5bPc/zHYjII5khoixIUTMO794NOY8F/ThF1Bo8ncZILarUTA==",
                "dev": true,
                "requires": {
                "acorn": "^7.1.0",
                  "acorn-jsx": "^5.1.0",
                  "eslint-visitor-keys": "^1.1.0"
              },
              "dependencies": {
                "acorn": {
                  "version": "7.1.0",
                    "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.1.0.tgz",
                    "integrity": "sha512-kL5CuoXA/dgxlBbVrflsflzQ3PAas7RYZB52NOm/6839iVYJgKMJ3cQJD+t2i5+qFa8h3MDpEOJiS64E8JLnSQ==",
                    "dev": true
                },
                "eslint-visitor-keys": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                    "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A==",
                    "dev": true
                }
              }
            },
            "esprima": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
                "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="
            },
            "esquery": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.0.1.tgz",
                "integrity": "sha512-SmiyZ5zIWH9VM+SRUReLS5Q8a7GxtRdxEBVZpm98rJM7Sb+A9DVCndXfkeFUd3byderg+EbDkfnevfCwynWaNA==",
                "requires": {
                "estraverse": "^4.0.0"
              }
            },
            "esrecurse": {
              "version": "4.2.1",
                "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.2.1.tgz",
                "integrity": "sha512-64RBB++fIOAXPw3P9cy89qfMlvZEXZkqqJkjqqXIvzP5ezRZjW+lPWjw35UX/3EhUPFYbg5ER4JYgDw4007/DQ==",
                "requires": {
                "estraverse": "^4.1.0"
              }
            },
            "estraverse": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz",
                "integrity": "sha1-De4/7TH81GlhjOc0IJn8GvoL2xM="
            },
            "esutils": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.2.tgz",
                "integrity": "sha1-Cr9PHKpbyx96nYrMbepPqqBLrJs="
            },
            "etag": {
              "version": "1.8.1",
                "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
                "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc="
            },
            "eventemitter3": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.0.tgz",
                "integrity": "sha512-qerSRB0p+UDEssxTtm6EDKcE7W4OaoisfIMl4CngyEhjpYglocpNg6UEqCvemdGhosAsg4sO2dXJOdyBifPGCg=="
            },
            "eventlistener": {
              "version": "0.0.1",
                "resolved": "https://registry.npmjs.org/eventlistener/-/eventlistener-0.0.1.tgz",
                "integrity": "sha1-7Suqu4UiJ68rz4iRUscsY8pTLrg="
            },
            "events": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/events/-/events-3.1.0.tgz",
                "integrity": "sha512-Rv+u8MLHNOdMjTAFeT3nCjHn2aGlx435FP/sDHNaRhDEMwyI/aB22Kj2qIN8R0cw3z28psEQLYwxVKLsKrMgWg=="
            },
            "eventsource": {
              "version": "1.0.7",
                "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-1.0.7.tgz",
                "integrity": "sha512-4Ln17+vVT0k8aWq+t/bF5arcS3EpT9gYtW66EPacdj/mAFevznsnyoHLPy2BA8gbIQeIHoPsvwmfBftfcG//BQ==",
                "requires": {
                "original": "^1.0.0"
              }
            },
            "evp_bytestokey": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/evp_bytestokey/-/evp_bytestokey-1.0.3.tgz",
                "integrity": "sha512-/f2Go4TognH/KvCISP7OUsHn85hT9nUkxxA9BEWxFn+Oj9o8ZNLm/40hdlgSLyuOimsrTKLUMEorQexp/aPQeA==",
                "requires": {
                "md5.js": "^1.3.4",
                  "safe-buffer": "^5.1.1"
              }
            },
            "exec-sh": {
              "version": "0.3.4",
                "resolved": "https://registry.npmjs.org/exec-sh/-/exec-sh-0.3.4.tgz",
                "integrity": "sha512-sEFIkc61v75sWeOe72qyrqg2Qg0OuLESziUDk/O/z2qgS15y2gWVFrI6f2Qn/qw/0/NCfCEsmNA4zOjkwEZT1A=="
            },
            "execa": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/execa/-/execa-1.0.0.tgz",
                "integrity": "sha512-adbxcyWV46qiHyvSp50TKt05tB4tK3HcmF7/nxfAdhnox83seTDbwnaqKO4sXRy7roHAIFqJP/Rw/AuEbX61LA==",
                "requires": {
                "cross-spawn": "^6.0.0",
                  "get-stream": "^4.0.0",
                  "is-stream": "^1.1.0",
                  "npm-run-path": "^2.0.0",
                  "p-finally": "^1.0.0",
                  "signal-exit": "^3.0.0",
                  "strip-eof": "^1.0.0"
              }
            },
            "exit": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/exit/-/exit-0.1.2.tgz",
                "integrity": "sha1-BjJjj42HfMghB9MKD/8aF8uhzQw="
            },
            "expand-brackets": {
              "version": "2.1.4",
                "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",
                "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",
                "requires": {
                "debug": "^2.3.3",
                  "define-property": "^0.2.5",
                  "extend-shallow": "^2.0.1",
                  "posix-character-classes": "^0.1.0",
                  "regex-not": "^1.0.0",
                  "snapdragon": "^0.8.1",
                  "to-regex": "^3.0.1"
              },
              "dependencies": {
                "define-property": {
                  "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                    "is-descriptor": "^0.1.0"
                  }
                },
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                }
              }
            },
            "expand-range": {
              "version": "1.8.2",
                "resolved": "https://registry.npmjs.org/expand-range/-/expand-range-1.8.2.tgz",
                "integrity": "sha1-opnv/TNf4nIeuujiV+x5ZE/IUzc=",
                "dev": true,
                "optional": true,
                "requires": {
                "fill-range": "^2.1.0"
              },
              "dependencies": {
                "fill-range": {
                  "version": "2.2.4",
                    "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-2.2.4.tgz",
                    "integrity": "sha512-cnrcCbj01+j2gTG921VZPnHbjmdAf8oQV/iGeV2kZxGSyfYjjTyY79ErsK1WJWMpw6DaApEX72binqJE+/d+5Q==",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "is-number": "^2.1.0",
                      "isobject": "^2.0.0",
                      "randomatic": "^3.0.0",
                      "repeat-element": "^1.1.2",
                      "repeat-string": "^1.5.2"
                  }
                },
                "is-number": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-2.1.0.tgz",
                    "integrity": "sha1-Afy7s5NGOlSPL0ZszhbezknbkI8=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "kind-of": "^3.0.2"
                  }
                },
                "isobject": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
                    "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "isarray": "1.0.0"
                  }
                }
              }
            },
            "expect": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/expect/-/expect-24.9.0.tgz",
                "integrity": "sha512-wvVAx8XIol3Z5m9zvZXiyZOQ+sRJqNTIm6sGjdWlaZIeupQGO3WbYI+15D/AmEwZywL6wtJkbAbJtzkOfBuR0Q==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "ansi-styles": "^3.2.0",
                  "jest-get-type": "^24.9.0",
                  "jest-matcher-utils": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-regex-util": "^24.9.0"
              }
            },
            "express": {
              "version": "4.17.1",
                "resolved": "https://registry.npmjs.org/express/-/express-4.17.1.tgz",
                "integrity": "sha512-mHJ9O79RqluphRrcw2X/GTh3k9tVv8YcoyY4Kkh4WDMUYKRZUq0h1o0w2rrrxBqM7VoeUVqgb27xlEMXTnYt4g==",
                "requires": {
                "accepts": "~1.3.7",
                  "array-flatten": "1.1.1",
                  "body-parser": "1.19.0",
                  "content-disposition": "0.5.3",
                  "content-type": "~1.0.4",
                  "cookie": "0.4.0",
                  "cookie-signature": "1.0.6",
                  "debug": "2.6.9",
                  "depd": "~1.1.2",
                  "encodeurl": "~1.0.2",
                  "escape-html": "~1.0.3",
                  "etag": "~1.8.1",
                  "finalhandler": "~1.1.2",
                  "fresh": "0.5.2",
                  "merge-descriptors": "1.0.1",
                  "methods": "~1.1.2",
                  "on-finished": "~2.3.0",
                  "parseurl": "~1.3.3",
                  "path-to-regexp": "0.1.7",
                  "proxy-addr": "~2.0.5",
                  "qs": "6.7.0",
                  "range-parser": "~1.2.1",
                  "safe-buffer": "5.1.2",
                  "send": "0.17.1",
                  "serve-static": "1.14.1",
                  "setprototypeof": "1.1.1",
                  "statuses": "~1.5.0",
                  "type-is": "~1.6.18",
                  "utils-merge": "1.0.1",
                  "vary": "~1.1.2"
              },
              "dependencies": {
                "array-flatten": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
                    "integrity": "sha1-ml9pkFGx5wczKPKgCJaLZOopVdI="
                },
                "path-to-regexp": {
                  "version": "0.1.7",
                    "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
                    "integrity": "sha1-32BBeABfUi8V60SQ5yR6G/qmf4w="
                },
                "qs": {
                  "version": "6.7.0",
                    "resolved": "https://registry.npmjs.org/qs/-/qs-6.7.0.tgz",
                    "integrity": "sha512-VCdBRNFTX1fyE7Nb6FYoURo/SPe62QCaAyzJvUjwRaIsc+NePBEniHlvxFmmX56+HZphIGtV0XeCirBtpDrTyQ=="
                }
              }
            },
            "ext": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/ext/-/ext-1.4.0.tgz",
                "integrity": "sha512-Key5NIsUxdqKg3vIsdw9dSuXpPCQ297y6wBjL30edxwPgt2E44WcWBZey/ZvUc6sERLTxKdyCu4gZFmUbk1Q7A==",
                "requires": {
                "type": "^2.0.0"
              },
              "dependencies": {
                "type": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/type/-/type-2.0.0.tgz",
                    "integrity": "sha512-KBt58xCHry4Cejnc2ISQAF7QY+ORngsWfxezO68+12hKV6lQY8P/psIkcbjeHWn7MqcgciWJyCCevFMJdIXpow=="
                }
              }
            },
            "extend": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
                "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="
            },
            "extend-shallow": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-3.0.2.tgz",
                "integrity": "sha1-Jqcarwc7OfshJxcnRhMcJwQCjbg=",
                "requires": {
                "assign-symbols": "^1.0.0",
                  "is-extendable": "^1.0.1"
              },
              "dependencies": {
                "is-extendable": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
                    "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
                    "requires": {
                    "is-plain-object": "^2.0.4"
                  }
                }
              }
            },
            "external-editor": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-3.0.3.tgz",
                "integrity": "sha512-bn71H9+qWoOQKyZDo25mOMVpSmXROAsTJVVVYzrrtol3d4y+AsKjf4Iwl2Q+IuT0kFSQ1qo166UuIwqYq7mGnA==",
                "requires": {
                "chardet": "^0.7.0",
                  "iconv-lite": "^0.4.24",
                  "tmp": "^0.0.33"
              }
            },
            "extglob": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",
                "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",
                "requires": {
                "array-unique": "^0.3.2",
                  "define-property": "^1.0.0",
                  "expand-brackets": "^2.1.4",
                  "extend-shallow": "^2.0.1",
                  "fragment-cache": "^0.2.1",
                  "regex-not": "^1.0.0",
                  "snapdragon": "^0.8.1",
                  "to-regex": "^3.0.1"
              },
              "dependencies": {
                "define-property": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                    "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                    "requires": {
                    "is-descriptor": "^1.0.0"
                  }
                },
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                },
                "is-accessor-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-data-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-descriptor": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                    "is-accessor-descriptor": "^1.0.0",
                      "is-data-descriptor": "^1.0.0",
                      "kind-of": "^6.0.2"
                  }
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "extsprintf": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/extsprintf/-/extsprintf-1.3.0.tgz",
                "integrity": "sha1-lpGEQOMEGnpBT4xS48V06zw+HgU="
            },
            "fast-deep-equal": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-2.0.1.tgz",
                "integrity": "sha1-ewUhjd+WZ79/Nwv3/bLLFf3Qqkk="
            },
            "fast-glob": {
              "version": "2.2.7",
                "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-2.2.7.tgz",
                "integrity": "sha512-g1KuQwHOZAmOZMuBtHdxDtju+T2RT8jgCC9aANsbpdiDDTSnjgfuVsIBNKbUeJI3oKMRExcfNDtJl4OhbffMsw==",
                "requires": {
                "@mrmlnc/readdir-enhanced": "^2.2.1",
                  "@nodelib/fs.stat": "^1.1.2",
                  "glob-parent": "^3.1.0",
                  "is-glob": "^4.0.0",
                  "merge2": "^1.2.3",
                  "micromatch": "^3.1.10"
              },
              "dependencies": {
                "glob-parent": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-3.1.0.tgz",
                    "integrity": "sha1-nmr2KZ2NO9K9QEMIMr0RPfkGxa4=",
                    "requires": {
                    "is-glob": "^3.1.0",
                      "path-dirname": "^1.0.0"
                  },
                  "dependencies": {
                    "is-glob": {
                      "version": "3.1.0",
                        "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",
                        "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",
                        "requires": {
                        "is-extglob": "^2.1.0"
                      }
                    }
                  }
                },
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                }
              }
            },
            "fast-json-stable-stringify": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
                "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="
            },
            "fast-levenshtein": {
              "version": "2.0.6",
                "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
                "integrity": "sha1-PYpcZog6FqMMqGQ+hR8Zuqd5eRc="
            },
            "faye-websocket": {
              "version": "0.10.0",
                "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.10.0.tgz",
                "integrity": "sha1-TkkvjQTftviQA1B/btvy1QHnxvQ=",
                "requires": {
                "websocket-driver": ">=0.5.1"
              }
            },
            "fb-watchman": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/fb-watchman/-/fb-watchman-2.0.1.tgz",
                "integrity": "sha512-DkPJKQeY6kKwmuMretBhr7G6Vodr7bFwDYTXIkfG1gjvNpaxBTQV3PbXg6bR1c1UP4jPOX0jHUbbHANL9vRjVg==",
                "requires": {
                "bser": "2.1.1"
              }
            },
            "fbjs": {
              "version": "0.8.17",
                "resolved": "https://registry.npmjs.org/fbjs/-/fbjs-0.8.17.tgz",
                "integrity": "sha1-xNWY6taUkRJlPWWIsBpc3Nn5D90=",
                "requires": {
                "core-js": "^1.0.0",
                  "isomorphic-fetch": "^2.1.1",
                  "loose-envify": "^1.0.0",
                  "object-assign": "^4.1.0",
                  "promise": "^7.1.1",
                  "setimmediate": "^1.0.5",
                  "ua-parser-js": "^0.7.18"
              },
              "dependencies": {
                "core-js": {
                  "version": "1.2.7",
                    "resolved": "https://registry.npmjs.org/core-js/-/core-js-1.2.7.tgz",
                    "integrity": "sha1-ZSKUwUZR2yj6k70tX/KYOk8IxjY="
                }
              }
            },
            "figgy-pudding": {
              "version": "3.5.1",
                "resolved": "https://registry.npmjs.org/figgy-pudding/-/figgy-pudding-3.5.1.tgz",
                "integrity": "sha512-vNKxJHTEKNThjfrdJwHc7brvM6eVevuO5nTj6ez8ZQ1qbXTvGthucRF7S4vf2cr71QVnT70V34v0S1DyQsti0w=="
            },
            "figures": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/figures/-/figures-2.0.0.tgz",
                "integrity": "sha1-OrGi0qYsi/tDGgyUy3l6L84nyWI=",
                "requires": {
                "escape-string-regexp": "^1.0.5"
              }
            },
            "file-entry-cache": {
              "version": "5.0.1",
                "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-5.0.1.tgz",
                "integrity": "sha512-bCg29ictuBaKUwwArK4ouCaqDgLZcysCFLmM/Yn/FDoqndh/9vNuQfXRDvTuXKLxfD/JtZQGKFT8MGcJBK644g==",
                "requires": {
                "flat-cache": "^2.0.1"
              }
            },
            "file-loader": {
              "version": "4.3.0",
                "resolved": "https://registry.npmjs.org/file-loader/-/file-loader-4.3.0.tgz",
                "integrity": "sha512-aKrYPYjF1yG3oX0kWRrqrSMfgftm7oJW5M+m4owoldH5C51C0RkIwB++JbRvEW3IU6/ZG5n8UvEcdgwOt2UOWA==",
                "requires": {
                "loader-utils": "^1.2.3",
                  "schema-utils": "^2.5.0"
              }
            },
            "file-uri-to-path": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
                "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
                "optional": true
            },
            "filename-regex": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/filename-regex/-/filename-regex-2.0.1.tgz",
                "integrity": "sha1-wcS5vuPglyXdsQa3XB4wH+LxiyY=",
                "dev": true,
                "optional": true
            },
            "filesize": {
              "version": "3.6.1",
                "resolved": "https://registry.npmjs.org/filesize/-/filesize-3.6.1.tgz",
                "integrity": "sha512-7KjR1vv6qnicaPMi1iiTcI85CyYwRO/PSFCu6SvqL8jN2Wjt/NIYQTFtFs7fSDCYOstUkEWIQGFUg5YZQfjlcg=="
            },
            "fill-range": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",
                "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",
                "requires": {
                "extend-shallow": "^2.0.1",
                  "is-number": "^3.0.0",
                  "repeat-string": "^1.6.1",
                  "to-regex-range": "^2.1.0"
              },
              "dependencies": {
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                }
              }
            },
            "finalhandler": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.1.2.tgz",
                "integrity": "sha512-aAWcW57uxVNrQZqFXjITpW3sIUQmHGG3qSb9mUah9MgMC4NeWhNOlNjXEYq3HjRAvL6arUviZGGJsBg6z0zsWA==",
                "requires": {
                "debug": "2.6.9",
                  "encodeurl": "~1.0.2",
                  "escape-html": "~1.0.3",
                  "on-finished": "~2.3.0",
                  "parseurl": "~1.3.3",
                  "statuses": "~1.5.0",
                  "unpipe": "~1.0.0"
              }
            },
            "find-cache-dir": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
                "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
                "requires": {
                "commondir": "^1.0.1",
                  "make-dir": "^2.0.0",
                  "pkg-dir": "^3.0.0"
              }
            },
            "find-root": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/find-root/-/find-root-1.1.0.tgz",
                "integrity": "sha512-NKfW6bec6GfKc0SGx1e07QZY9PE99u0Bft/0rzSD5k3sO/vwkVUpDUKVm5Gpp5Ue3YfShPFTX2070tDs5kB9Ng==",
                "dev": true
            },
            "find-up": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/find-up/-/find-up-1.1.2.tgz",
                "integrity": "sha1-ay6YIrGizgpgq2TWEOzK1TyyTQ8=",
                "requires": {
                "path-exists": "^2.0.0",
                  "pinkie-promise": "^2.0.0"
              },
              "dependencies": {
                "path-exists": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-2.1.0.tgz",
                    "integrity": "sha1-D+tsZPD8UY2adU3V77YscCJ2H0s=",
                    "requires": {
                    "pinkie-promise": "^2.0.0"
                  }
                }
              }
            },
            "flat-cache": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-2.0.1.tgz",
                "integrity": "sha512-LoQe6yDuUMDzQAEH8sgmh4Md6oZnc/7PjtwjNFSzveXqSHt6ka9fPBuso7IGf9Rz4uqnSnWiFH2B/zj24a5ReA==",
                "requires": {
                "flatted": "^2.0.0",
                  "rimraf": "2.6.3",
                  "write": "1.0.3"
              }
            },
            "flatted": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/flatted/-/flatted-2.0.1.tgz",
                "integrity": "sha512-a1hQMktqW9Nmqr5aktAux3JMNqaucxGcjtjWnZLHX7yyPCmlSV3M54nGYbqT8K+0GhF3NBgmJCc3ma+WOgX8Jg=="
            },
            "flatten": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/flatten/-/flatten-1.0.3.tgz",
                "integrity": "sha512-dVsPA/UwQ8+2uoFe5GHtiBMu48dWLTdsuEd7CKGlZlD78r1TTWBvDuFaFGKCo/ZfEr95Uk56vZoX86OsHkUeIg=="
            },
            "flush-write-stream": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/flush-write-stream/-/flush-write-stream-1.1.1.tgz",
                "integrity": "sha512-3Z4XhFZ3992uIq0XOqb9AreonueSYphE6oYbpt5+3u06JWklbsPkNv3ZKkP9Bz/r+1MWCaMoSQ28P85+1Yc77w==",
                "requires": {
                "inherits": "^2.0.3",
                  "readable-stream": "^2.3.6"
              }
            },
            "follow-redirects": {
              "version": "1.5.10",
                "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.5.10.tgz",
                "integrity": "sha512-0V5l4Cizzvqt5D44aTXbFZz+FtyXV1vrDN6qrelxtfYQKW0KO0W2T/hkE8xvGa/540LkZlkaUjO4ailYTFtHVQ==",
                "requires": {
                "debug": "=3.1.0"
              },
              "dependencies": {
                "debug": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
                    "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
                    "requires": {
                    "ms": "2.0.0"
                  }
                },
                "ms": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
                    "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
                }
              }
            },
            "for-in": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/for-in/-/for-in-1.0.2.tgz",
                "integrity": "sha1-gQaNKVqBQuwKxybG4iAMMPttXoA="
            },
            "for-own": {
              "version": "0.1.5",
                "resolved": "https://registry.npmjs.org/for-own/-/for-own-0.1.5.tgz",
                "integrity": "sha1-UmXGgaTylNq78XyVCbZ2OqhFEM4=",
                "requires": {
                "for-in": "^1.0.1"
              }
            },
            "forever-agent": {
              "version": "0.6.1",
                "resolved": "https://registry.npmjs.org/forever-agent/-/forever-agent-0.6.1.tgz",
                "integrity": "sha1-+8cfDEGt6zf5bFd60e1C2P2sypE="
            },
            "fork-ts-checker-webpack-plugin": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/fork-ts-checker-webpack-plugin/-/fork-ts-checker-webpack-plugin-3.1.0.tgz",
                "integrity": "sha512-6OkRfjuNMNqb14f01xokcWcKV5Ekknc2FvziNpcTYru+kxIYFA2MtuuBI19MHThZnjSBhoi35Dcq+I0oUkFjmQ==",
                "requires": {
                "babel-code-frame": "^6.22.0",
                  "chalk": "^2.4.1",
                  "chokidar": "^2.0.4",
                  "micromatch": "^3.1.10",
                  "minimatch": "^3.0.4",
                  "semver": "^5.6.0",
                  "tapable": "^1.0.0",
                  "worker-rpc": "^0.1.0"
              }
            },
            "form-data": {
              "version": "2.3.3",
                "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.3.3.tgz",
                "integrity": "sha512-1lLKB2Mu3aGP1Q/2eCOx0fNbRMe7XdwktwOruhfqqd0rIJWwN4Dh+E3hrPSlDCXnSR7UtZ1N38rVXm+6+MEhJQ==",
                "requires": {
                "asynckit": "^0.4.0",
                  "combined-stream": "^1.0.6",
                  "mime-types": "^2.1.12"
              }
            },
            "forwarded": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.1.2.tgz",
                "integrity": "sha1-mMI9qxF1ZXuMBXPozszZGw/xjIQ="
            },
            "fragment-cache": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/fragment-cache/-/fragment-cache-0.2.1.tgz",
                "integrity": "sha1-QpD60n8T6Jvn8zeZxrxaCr//DRk=",
                "requires": {
                "map-cache": "^0.2.2"
              }
            },
            "fresh": {
              "version": "0.5.2",
                "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
                "integrity": "sha1-PYyt2Q2XZWn6g1qx+OSyOhBWBac="
            },
            "from2": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
                "integrity": "sha1-i/tVAr3kpNNs/e6gB/zKIdfjgq8=",
                "requires": {
                "inherits": "^2.0.1",
                  "readable-stream": "^2.0.0"
              }
            },
            "fs-extra": {
              "version": "8.1.0",
                "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-8.1.0.tgz",
                "integrity": "sha512-yhlQgA6mnOJUKOsRUFsgJdQCvkKhcz8tlZG5HBQfReYZy46OwLcY+Zia0mtdHsOo9y/hP+CxMN0TU9QxoOtG4g==",
                "requires": {
                "graceful-fs": "^4.2.0",
                  "jsonfile": "^4.0.0",
                  "universalify": "^0.1.0"
              },
              "dependencies": {
                "graceful-fs": {
                  "version": "4.2.3",
                    "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.3.tgz",
                    "integrity": "sha512-a30VEBm4PEdx1dRB7MFK7BejejvCvBronbLjht+sHuGYj8PHs7M/5Z+rt5lw551vZ7yfTCj4Vuyy3mSJytDWRQ=="
                }
              }
            },
            "fs-minipass": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/fs-minipass/-/fs-minipass-2.0.0.tgz",
                "integrity": "sha512-40Qz+LFXmd9tzYVnnBmZvFfvAADfUA14TXPK1s7IfElJTIZ97rA8w4Kin7Wt5JBrC3ShnnFJO/5vPjPEeJIq9A==",
                "requires": {
                "minipass": "^3.0.0"
              }
            },
            "fs-readdir-recursive": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/fs-readdir-recursive/-/fs-readdir-recursive-1.1.0.tgz",
                "integrity": "sha512-GNanXlVr2pf02+sPN40XN8HG+ePaNcvM0q5mZBd668Obwb0yD5GiUbZOFgwn8kGMY6I3mdyDJzieUy3PTYyTRA==",
                "dev": true
            },
            "fs-write-stream-atomic": {
              "version": "1.0.10",
                "resolved": "https://registry.npmjs.org/fs-write-stream-atomic/-/fs-write-stream-atomic-1.0.10.tgz",
                "integrity": "sha1-tH31NJPvkR33VzHnCp3tAYnbQMk=",
                "requires": {
                "graceful-fs": "^4.1.2",
                  "iferr": "^0.1.5",
                  "imurmurhash": "^0.1.4",
                  "readable-stream": "1 || 2"
              }
            },
            "fs.realpath": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
                "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="
            },
            "fsevents": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.1.2.tgz",
                "integrity": "sha512-R4wDiBwZ0KzpgOWetKDug1FZcYhqYnUYKtfZYt4mD5SBz76q0KR4Q9o7GIPamsVPGmW3EYPPJ0dOOjvx32ldZA==",
                "optional": true
            },
            "fstream": {
              "version": "1.0.12",
                "resolved": "https://registry.npmjs.org/fstream/-/fstream-1.0.12.tgz",
                "integrity": "sha512-WvJ193OHa0GHPEL+AycEJgxvBEwyfRkN1vhjca23OaPVMCaLCXTd5qAu82AjTcgP1UJmytkOKb63Ypde7raDIg==",
                "requires": {
                "graceful-fs": "^4.1.2",
                  "inherits": "~2.0.0",
                  "mkdirp": ">=0.5 0",
                  "rimraf": "2"
              }
            },
            "function-bind": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
                "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
            },
            "functional-red-black-tree": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/functional-red-black-tree/-/functional-red-black-tree-1.0.1.tgz",
                "integrity": "sha1-GwqzvVU7Kg1jmdKcDj6gslIHgyc="
            },
            "gauge": {
              "version": "2.7.4",
                "resolved": "https://registry.npmjs.org/gauge/-/gauge-2.7.4.tgz",
                "integrity": "sha1-LANAXHU4w51+s3sxcCLjJfsBi/c=",
                "requires": {
                "aproba": "^1.0.3",
                  "console-control-strings": "^1.0.0",
                  "has-unicode": "^2.0.0",
                  "object-assign": "^4.1.0",
                  "signal-exit": "^3.0.0",
                  "string-width": "^1.0.1",
                  "strip-ansi": "^3.0.1",
                  "wide-align": "^1.1.0"
              },
              "dependencies": {
                "is-fullwidth-code-point": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
                    "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
                    "requires": {
                    "number-is-nan": "^1.0.0"
                  }
                },
                "string-width": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
                    "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
                    "requires": {
                    "code-point-at": "^1.0.0",
                      "is-fullwidth-code-point": "^1.0.0",
                      "strip-ansi": "^3.0.0"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                }
              }
            },
            "gaze": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/gaze/-/gaze-1.1.3.tgz",
                "integrity": "sha512-BRdNm8hbWzFzWHERTrejLqwHDfS4GibPoq5wjTPIoJHoBtKGPg3xAFfxmM+9ztbXelxcf2hwQcaz1PtmFeue8g==",
                "requires": {
                "globule": "^1.0.0"
              }
            },
            "get-caller-file": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-1.0.3.tgz",
                "integrity": "sha512-3t6rVToeoZfYSGd8YoLFR2DJkiQrIiUrGcjvFX2mDw3bn6k2OtwHN0TNCLbBO+w8qTvimhDkv+LSscbJY1vE6w=="
            },
            "get-own-enumerable-property-symbols": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/get-own-enumerable-property-symbols/-/get-own-enumerable-property-symbols-3.0.2.tgz",
                "integrity": "sha512-I0UBV/XOz1XkIJHEUDMZAbzCThU/H8DxmSfmdGcKPnVhu2VfFqr34jr9777IyaTYvxjedWhqVIilEDsCdP5G6g=="
            },
            "get-stdin": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/get-stdin/-/get-stdin-4.0.1.tgz",
                "integrity": "sha1-uWjGsKBDhDJJAui/Gl3zJXmkUP4="
            },
            "get-stream": {
              "version": "4.1.0",
                "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",
                "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",
                "requires": {
                "pump": "^3.0.0"
              }
            },
            "get-value": {
              "version": "2.0.6",
                "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",
                "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg="
            },
            "getpass": {
              "version": "0.1.7",
                "resolved": "https://registry.npmjs.org/getpass/-/getpass-0.1.7.tgz",
                "integrity": "sha1-Xv+OPmhNVprkyysSgmBOi6YhSfo=",
                "requires": {
                "assert-plus": "^1.0.0"
              }
            },
            "glob": {
              "version": "7.1.3",
                "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",
                "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",
                "requires": {
                "fs.realpath": "^1.0.0",
                  "inflight": "^1.0.4",
                  "inherits": "2",
                  "minimatch": "^3.0.4",
                  "once": "^1.3.0",
                  "path-is-absolute": "^1.0.0"
              }
            },
            "glob-base": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/glob-base/-/glob-base-0.3.0.tgz",
                "integrity": "sha1-27Fk9iIbHAscz4Kuoyi0l98Oo8Q=",
                "dev": true,
                "optional": true,
                "requires": {
                "glob-parent": "^2.0.0",
                  "is-glob": "^2.0.0"
              },
              "dependencies": {
                "glob-parent": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-2.0.0.tgz",
                    "integrity": "sha1-gTg9ctsFT8zPUzbaqQLxgvbtuyg=",
                    "dev": true,
                    "optional": true,
                    "requires": {
                    "is-glob": "^2.0.0"
                  }
                }
              }
            },
            "glob-parent": {
              "version": "5.1.0",
                "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.0.tgz",
                "integrity": "sha512-qjtRgnIVmOfnKUE3NJAQEdk+lKrxfw8t5ke7SXtfMTHcjsBfOfWXCQfdb30zfDoZQ2IRSIiidmjtbHZPZ++Ihw==",
                "requires": {
                "is-glob": "^4.0.1"
              },
              "dependencies": {
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                }
              }
            },
            "glob-to-regexp": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.3.0.tgz",
                "integrity": "sha1-jFoUlNIGbFcMw7/kSWF1rMTVAqs="
            },
            "global-modules": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/global-modules/-/global-modules-2.0.0.tgz",
                "integrity": "sha512-NGbfmJBp9x8IxyJSd1P+otYK8vonoJactOogrVfFRIAEY1ukil8RSKDz2Yo7wh1oihl51l/r6W4epkeKJHqL8A==",
                "requires": {
                "global-prefix": "^3.0.0"
              }
            },
            "global-prefix": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/global-prefix/-/global-prefix-3.0.0.tgz",
                "integrity": "sha512-awConJSVCHVGND6x3tmMaKcQvwXLhjdkmomy2W+Goaui8YPgYgXJZewhg3fWC+DlfqqQuWg8AwqjGTD2nAPVWg==",
                "requires": {
                "ini": "^1.3.5",
                  "kind-of": "^6.0.2",
                  "which": "^1.3.1"
              },
              "dependencies": {
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "globals": {
              "version": "11.9.0",
                "resolved": "https://registry.npmjs.org/globals/-/globals-11.9.0.tgz",
                "integrity": "sha512-5cJVtyXWH8PiJPVLZzzoIizXx944O4OmRro5MWKx5fT4MgcN7OfaMutPeaTdJCCURwbWdhhcCWcKIffPnmTzBg=="
            },
            "globby": {
              "version": "8.0.2",
                "resolved": "https://registry.npmjs.org/globby/-/globby-8.0.2.tgz",
                "integrity": "sha512-yTzMmKygLp8RUpG1Ymu2VXPSJQZjNAZPD4ywgYEaG7e4tBJeUQBO8OpXrf1RCNcEs5alsoJYPAMiIHP0cmeC7w==",
                "requires": {
                "array-union": "^1.0.1",
                  "dir-glob": "2.0.0",
                  "fast-glob": "^2.0.2",
                  "glob": "^7.1.2",
                  "ignore": "^3.3.5",
                  "pify": "^3.0.0",
                  "slash": "^1.0.0"
              },
              "dependencies": {
                "ignore": {
                  "version": "3.3.10",
                    "resolved": "https://registry.npmjs.org/ignore/-/ignore-3.3.10.tgz",
                    "integrity": "sha512-Pgs951kaMm5GXP7MOvxERINe3gsaVjUWFm+UZPSq9xYriQAksyhg0csnS0KXSNRD5NmNdapXEpjxG49+AKh/ug=="
                },
                "pify": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
                    "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
                },
                "slash": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/slash/-/slash-1.0.0.tgz",
                    "integrity": "sha1-xB8vbDn8FtHNF61LXYlhFK5HDVU="
                }
              }
            },
            "globule": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/globule/-/globule-1.3.0.tgz",
                "integrity": "sha512-YlD4kdMqRCQHrhVdonet4TdRtv1/sZKepvoxNT4Nrhrp5HI8XFfc8kFlGlBn2myBo80aGp8Eft259mbcUJhgSg==",
                "requires": {
                "glob": "~7.1.1",
                  "lodash": "~4.17.10",
                  "minimatch": "~3.0.2"
              }
            },
            "graceful-fs": {
              "version": "4.1.15",
                "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.1.15.tgz",
                "integrity": "sha512-6uHUhOPEBgQ24HM+r6b/QwWfZq+yiFcipKFrOFiBEnWdy5sdzYoi+pJeQaPI5qOLRFqWmAXUPQNsielzdLoecA=="
            },
            "growly": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/growly/-/growly-1.3.0.tgz",
                "integrity": "sha1-8QdIy+dq+WS3yWyTxrzCivEgwIE="
            },
            "gud": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/gud/-/gud-1.0.0.tgz",
                "integrity": "sha512-zGEOVKFM5sVPPrYs7J5/hYEw2Pof8KCyOwyhG8sAF26mCAeUFAcYPu1mwB7hhpIP29zOIBaDqwuHdLp0jvZXjw=="
            },
            "gzip-size": {
              "version": "5.1.1",
                "resolved": "https://registry.npmjs.org/gzip-size/-/gzip-size-5.1.1.tgz",
                "integrity": "sha512-FNHi6mmoHvs1mxZAds4PpdCS6QG8B4C1krxJsMutgxl5t3+GlRTzzI3NEkifXx2pVsOvJdOGSmIgDhQ55FwdPA==",
                "requires": {
                "duplexer": "^0.1.1",
                  "pify": "^4.0.1"
              },
              "dependencies": {
                "pify": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
                    "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
                }
              }
            },
            "hammerjs": {
              "version": "2.0.8",
                "resolved": "https://registry.npmjs.org/hammerjs/-/hammerjs-2.0.8.tgz",
                "integrity": "sha1-BO93hiz/K7edMPdpIJWTAiK/YPE="
            },
            "handle-thing": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/handle-thing/-/handle-thing-2.0.0.tgz",
                "integrity": "sha512-d4sze1JNC454Wdo2fkuyzCr6aHcbL6PGGuFAz0Li/NcOm1tCHGnWDRmJP85dh9IhQErTc2svWFEX5xHIOo//kQ=="
            },
            "handlebars": {
              "version": "4.7.0",
                "resolved": "https://registry.npmjs.org/handlebars/-/handlebars-4.7.0.tgz",
                "integrity": "sha512-PaZ6G6nYzfJ0Hd1WIhOpsnUPWh1R0Pg//r4wEYOtzG65c2V8RJQ/++yYlVmuoQ7EMXcb4eri5+FB2XH1Lwed9g==",
                "requires": {
                "neo-async": "^2.6.0",
                  "optimist": "^0.6.1",
                  "source-map": "^0.6.1",
                  "uglify-js": "^3.1.4"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "har-schema": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/har-schema/-/har-schema-2.0.0.tgz",
                "integrity": "sha1-qUwiJOvKwEeCoNkDVSHyRzW37JI="
            },
            "har-validator": {
              "version": "5.1.3",
                "resolved": "https://registry.npmjs.org/har-validator/-/har-validator-5.1.3.tgz",
                "integrity": "sha512-sNvOCzEQNr/qrvJgc3UG/kD4QtlHycrzwS+6mfTrrSq97BvaYcPZZI1ZSqGSPR73Cxn4LKTD4PttRwfU7jWq5g==",
                "requires": {
                "ajv": "^6.5.5",
                  "har-schema": "^2.0.0"
              }
            },
            "harmony-reflect": {
              "version": "1.6.1",
                "resolved": "https://registry.npmjs.org/harmony-reflect/-/harmony-reflect-1.6.1.tgz",
                "integrity": "sha512-WJTeyp0JzGtHcuMsi7rw2VwtkvLa+JyfEKJCFyfcS0+CDkjQ5lHPu7zEhFZP+PDSRrEgXa5Ah0l1MbgbE41XjA=="
            },
            "has": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
                "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
                "requires": {
                "function-bind": "^1.1.1"
              }
            },
            "has-ansi": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/has-ansi/-/has-ansi-2.0.0.tgz",
                "integrity": "sha1-NPUEnOHs3ysGSa8+8k5F7TVBbZE=",
                "requires": {
                "ansi-regex": "^2.0.0"
              }
            },
            "has-flag": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
                "integrity": "sha1-tdRU3CGZriJWmfNGfloH87lVuv0="
            },
            "has-symbols": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.0.tgz",
                "integrity": "sha1-uhqPGvKg/DllD1yFA2dwQSIGO0Q="
            },
            "has-unicode": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/has-unicode/-/has-unicode-2.0.1.tgz",
                "integrity": "sha1-4Ob+aijPUROIVeCG0Wkedx3iqLk="
            },
            "has-value": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/has-value/-/has-value-1.0.0.tgz",
                "integrity": "sha1-GLKB2lhbHFxR3vJMkw7SmgvmsXc=",
                "requires": {
                "get-value": "^2.0.6",
                  "has-values": "^1.0.0",
                  "isobject": "^3.0.0"
              }
            },
            "has-values": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/has-values/-/has-values-1.0.0.tgz",
                "integrity": "sha1-lbC2P+whRmGab+V/51Yo1aOe/k8=",
                "requires": {
                "is-number": "^3.0.0",
                  "kind-of": "^4.0.0"
              },
              "dependencies": {
                "kind-of": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-4.0.0.tgz",
                    "integrity": "sha1-IIE989cSkosgc3hpGkUGb65y3Vc=",
                    "requires": {
                    "is-buffer": "^1.1.5"
                  }
                }
              }
            },
            "hash-base": {
              "version": "3.0.4",
                "resolved": "https://registry.npmjs.org/hash-base/-/hash-base-3.0.4.tgz",
                "integrity": "sha1-X8hoaEfs1zSZQDMZprCj8/auSRg=",
                "requires": {
                "inherits": "^2.0.1",
                  "safe-buffer": "^5.0.1"
              }
            },
            "hash.js": {
              "version": "1.1.7",
                "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
                "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
                "requires": {
                "inherits": "^2.0.3",
                  "minimalistic-assert": "^1.0.1"
              }
            },
            "he": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
                "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw=="
            },
            "hex-color-regex": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/hex-color-regex/-/hex-color-regex-1.1.0.tgz",
                "integrity": "sha512-l9sfDFsuqtOqKDsQdqrMRk0U85RZc0RtOR9yPI7mRVOa4FsR/BVnZ0shmQRM96Ji99kYZP/7hn1cedc1+ApsTQ=="
            },
            "history": {
              "version": "4.10.1",
                "resolved": "https://registry.npmjs.org/history/-/history-4.10.1.tgz",
                "integrity": "sha512-36nwAD620w12kuzPAsyINPWJqlNbij+hpK1k9XRloDtym8mxzGYl2c17LnV6IAGB2Dmg4tEa7G7DlawS0+qjew==",
                "requires": {
                "@babel/runtime": "^7.1.2",
                  "loose-envify": "^1.2.0",
                  "resolve-pathname": "^3.0.0",
                  "tiny-invariant": "^1.0.2",
                  "tiny-warning": "^1.0.0",
                  "value-equal": "^1.0.1"
              }
            },
            "hmac-drbg": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
                "integrity": "sha1-0nRXAQJabHdabFRXk+1QL8DGSaE=",
                "requires": {
                "hash.js": "^1.0.3",
                  "minimalistic-assert": "^1.0.0",
                  "minimalistic-crypto-utils": "^1.0.1"
              }
            },
            "hoist-non-react-statics": {
              "version": "3.3.1",
                "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.1.tgz",
                "integrity": "sha512-wbg3bpgA/ZqWrZuMOeJi8+SKMhr7X9TesL/rXMjTzh0p0JUBo3II8DHboYbuIXWRlttrUFxwcu/5kygrCw8fJw==",
                "requires": {
                "react-is": "^16.7.0"
              }
            },
            "home-or-tmp": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/home-or-tmp/-/home-or-tmp-2.0.0.tgz",
                "integrity": "sha1-42w/LSyufXRqhX440Y1fMqeILbg=",
                "dev": true,
                "requires": {
                "os-homedir": "^1.0.0",
                  "os-tmpdir": "^1.0.1"
              }
            },
            "hosted-git-info": {
              "version": "2.8.5",
                "resolved": "https://registry.npmjs.org/hosted-git-info/-/hosted-git-info-2.8.5.tgz",
                "integrity": "sha512-kssjab8CvdXfcXMXVcvsXum4Hwdq9XGtRD3TteMEvEbq0LXyiNQr6AprqKqfeaDXze7SxWvRxdpwE6ku7ikLkg=="
            },
            "hpack.js": {
              "version": "2.1.6",
                "resolved": "https://registry.npmjs.org/hpack.js/-/hpack.js-2.1.6.tgz",
                "integrity": "sha1-h3dMCUnlE/QuhFdbPEVoH63ioLI=",
                "requires": {
                "inherits": "^2.0.1",
                  "obuf": "^1.0.0",
                  "readable-stream": "^2.0.1",
                  "wbuf": "^1.1.0"
              }
            },
            "hsl-regex": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/hsl-regex/-/hsl-regex-1.0.0.tgz",
                "integrity": "sha1-1JMwx4ntgZ4nakwNJy3/owsY/m4="
            },
            "hsla-regex": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/hsla-regex/-/hsla-regex-1.0.0.tgz",
                "integrity": "sha1-wc56MWjIxmFAM6S194d/OyJfnDg="
            },
            "html-comment-regex": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/html-comment-regex/-/html-comment-regex-1.1.2.tgz",
                "integrity": "sha512-P+M65QY2JQ5Y0G9KKdlDpo0zK+/OHptU5AaBwUfAIDJZk1MYf32Frm84EcOytfJE0t5JvkAnKlmjsXDnWzCJmQ=="
            },
            "html-encoding-sniffer": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-1.0.2.tgz",
                "integrity": "sha512-71lZziiDnsuabfdYiUeWdCVyKuqwWi23L8YeIgV9jSSZHCtb6wB1BKWooH7L3tn4/FuZJMVWyNaIDr4RGmaSYw==",
                "requires": {
                "whatwg-encoding": "^1.0.1"
              }
            },
            "html-entities": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/html-entities/-/html-entities-1.2.1.tgz",
                "integrity": "sha1-DfKTUfByEWNRXfueVUPl9u7VFi8="
            },
            "html-minifier": {
              "version": "3.5.21",
                "resolved": "https://registry.npmjs.org/html-minifier/-/html-minifier-3.5.21.tgz",
                "integrity": "sha512-LKUKwuJDhxNa3uf/LPR/KVjm/l3rBqtYeCOAekvG8F1vItxMUpueGd94i/asDDr8/1u7InxzFA5EeGjhhG5mMA==",
                "requires": {
                "camel-case": "3.0.x",
                  "clean-css": "4.2.x",
                  "commander": "2.17.x",
                  "he": "1.2.x",
                  "param-case": "2.1.x",
                  "relateurl": "0.2.x",
                  "uglify-js": "3.4.x"
              },
              "dependencies": {
                "commander": {
                  "version": "2.17.1",
                    "resolved": "https://registry.npmjs.org/commander/-/commander-2.17.1.tgz",
                    "integrity": "sha512-wPMUt6FnH2yzG95SA6mzjQOEKUU3aLaDEmzs1ti+1E9h+CsrZghRlqEM/EJ4KscsQVG8uNN4uVreUeT8+drlgg=="
                }
              }
            },
            "html-webpack-plugin": {
              "version": "4.0.0-beta.5",
                "resolved": "https://registry.npmjs.org/html-webpack-plugin/-/html-webpack-plugin-4.0.0-beta.5.tgz",
                "integrity": "sha512-y5l4lGxOW3pz3xBTFdfB9rnnrWRPVxlAhX6nrBYIcW+2k2zC3mSp/3DxlWVCMBfnO6UAnoF8OcFn0IMy6kaKAQ==",
                "requires": {
                "html-minifier": "^3.5.20",
                  "loader-utils": "^1.1.0",
                  "lodash": "^4.17.11",
                  "pretty-error": "^2.1.1",
                  "tapable": "^1.1.0",
                  "util.promisify": "1.0.0"
              }
            },
            "htmlparser2": {
              "version": "3.10.1",
                "resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.10.1.tgz",
                "integrity": "sha512-IgieNijUMbkDovyoKObU1DUhm1iwNYE/fuifEoEHfd1oZKZDaONBSkal7Y01shxsM49R4XaMdGez3WnF9UfiCQ==",
                "requires": {
                "domelementtype": "^1.3.1",
                  "domhandler": "^2.3.0",
                  "domutils": "^1.5.1",
                  "entities": "^1.1.1",
                  "inherits": "^2.0.1",
                  "readable-stream": "^3.1.1"
              },
              "dependencies": {
                "entities": {
                  "version": "1.1.2",
                    "resolved": "https://registry.npmjs.org/entities/-/entities-1.1.2.tgz",
                    "integrity": "sha512-f2LZMYl1Fzu7YSBKg+RoROelpOaNrcGmE9AZubeDfrCEia483oW4MI4VyFd5VNHIgQ/7qm1I0wUHK1eJnn2y2w=="
                },
                "readable-stream": {
                  "version": "3.4.0",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.4.0.tgz",
                    "integrity": "sha512-jItXPLmrSR8jmTRmRWJXCnGJsfy85mB3Wd/uINMXA65yrnFo0cPClFIUWzo2najVNSl+mx7/4W8ttlLWJe99pQ==",
                    "requires": {
                    "inherits": "^2.0.3",
                      "string_decoder": "^1.1.1",
                      "util-deprecate": "^1.0.1"
                  }
                }
              }
            },
            "http-deceiver": {
              "version": "1.2.7",
                "resolved": "https://registry.npmjs.org/http-deceiver/-/http-deceiver-1.2.7.tgz",
                "integrity": "sha1-+nFolEq5pRnTN8sL7HKE3D5yPYc="
            },
            "http-errors": {
              "version": "1.7.2",
                "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.7.2.tgz",
                "integrity": "sha512-uUQBt3H/cSIVfch6i1EuPNy/YsRSOUBXTVfZ+yR7Zjez3qjBz6i9+i4zjNaoqcoFVI4lQJ5plg63TvGfRSDCRg==",
                "requires": {
                "depd": "~1.1.2",
                  "inherits": "2.0.3",
                  "setprototypeof": "1.1.1",
                  "statuses": ">= 1.5.0 < 2",
                  "toidentifier": "1.0.0"
              }
            },
            "http-parser-js": {
              "version": "0.4.10",
                "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.4.10.tgz",
                "integrity": "sha1-ksnBN0w1CF912zWexWzCV8u5P6Q="
            },
            "http-proxy": {
              "version": "1.18.0",
                "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.18.0.tgz",
                "integrity": "sha512-84I2iJM/n1d4Hdgc6y2+qY5mDaz2PUVjlg9znE9byl+q0uC3DeByqBGReQu5tpLK0TAqTIXScRUV+dg7+bUPpQ==",
                "requires": {
                "eventemitter3": "^4.0.0",
                  "follow-redirects": "^1.0.0",
                  "requires-port": "^1.0.0"
              }
            },
            "http-proxy-middleware": {
              "version": "0.19.1",
                "resolved": "https://registry.npmjs.org/http-proxy-middleware/-/http-proxy-middleware-0.19.1.tgz",
                "integrity": "sha512-yHYTgWMQO8VvwNS22eLLloAkvungsKdKTLO8AJlftYIKNfJr3GK3zK0ZCfzDDGUBttdGc8xFy1mCitvNKQtC3Q==",
                "requires": {
                "http-proxy": "^1.17.0",
                  "is-glob": "^4.0.0",
                  "lodash": "^4.17.11",
                  "micromatch": "^3.1.10"
              },
              "dependencies": {
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                }
              }
            },
            "http-signature": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/http-signature/-/http-signature-1.2.0.tgz",
                "integrity": "sha1-muzZJRFHcvPZW2WmCruPfBj7rOE=",
                "requires": {
                "assert-plus": "^1.0.0",
                  "jsprim": "^1.2.2",
                  "sshpk": "^1.7.0"
              }
            },
            "https-browserify": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/https-browserify/-/https-browserify-1.0.0.tgz",
                "integrity": "sha1-7AbBDgo0wPL68Zn3/X/Hj//QPHM="
            },
            "iconv-lite": {
              "version": "0.4.24",
                "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
                "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
                "requires": {
                "safer-buffer": ">= 2.1.2 < 3"
              }
            },
            "icss-utils": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/icss-utils/-/icss-utils-4.1.1.tgz",
                "integrity": "sha512-4aFq7wvWyMHKgxsH8QQtGpvbASCf+eM3wPRLI6R+MgAnTCZ6STYsRvttLvRWK0Nfif5piF394St3HeJDaljGPA==",
                "requires": {
                "postcss": "^7.0.14"
              }
            },
            "identity-obj-proxy": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/identity-obj-proxy/-/identity-obj-proxy-3.0.0.tgz",
                "integrity": "sha1-lNK9qWCERT7zb7xarsN+D3nx/BQ=",
                "requires": {
                "harmony-reflect": "^1.4.6"
              }
            },
            "ieee754": {
              "version": "1.1.13",
                "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
                "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
            },
            "iferr": {
              "version": "0.1.5",
                "resolved": "https://registry.npmjs.org/iferr/-/iferr-0.1.5.tgz",
                "integrity": "sha1-xg7taebY/bazEEofy8ocGS3FtQE="
            },
            "ignore": {
              "version": "4.0.6",
                "resolved": "https://registry.npmjs.org/ignore/-/ignore-4.0.6.tgz",
                "integrity": "sha512-cyFDKrqc/YdcWFniJhzI42+AzS+gNwmUzOSFcRCQYwySuBBBy/KjuxWLZ/FHEH6Moq1NizMOBWyTcv8O4OZIMg=="
            },
            "immer": {
              "version": "1.10.0",
                "resolved": "https://registry.npmjs.org/immer/-/immer-1.10.0.tgz",
                "integrity": "sha512-O3sR1/opvCDGLEVcvrGTMtLac8GJ5IwZC4puPrLuRj3l7ICKvkmA0vGuU9OW8mV9WIBRnaxp5GJh9IEAaNOoYg=="
            },
            "immutable": {
              "version": "3.7.6",
                "resolved": "https://registry.npmjs.org/immutable/-/immutable-3.7.6.tgz",
                "integrity": "sha1-E7TTyxK++hVIKib+Gy665kAHHks="
            },
            "import-cwd": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/import-cwd/-/import-cwd-2.1.0.tgz",
                "integrity": "sha1-qmzzbnInYShcs3HsZRn1PiQ1sKk=",
                "requires": {
                "import-from": "^2.1.0"
              }
            },
            "import-fresh": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-2.0.0.tgz",
                "integrity": "sha1-2BNVwVYS04bGH53dOSLUMEgipUY=",
                "requires": {
                "caller-path": "^2.0.0",
                  "resolve-from": "^3.0.0"
              }
            },
            "import-from": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/import-from/-/import-from-2.1.0.tgz",
                "integrity": "sha1-M1238qev/VOqpHHUuAId7ja387E=",
                "requires": {
                "resolve-from": "^3.0.0"
              }
            },
            "import-local": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/import-local/-/import-local-2.0.0.tgz",
                "integrity": "sha512-b6s04m3O+s3CGSbqDIyP4R6aAwAeYlVq9+WUWep6iHa8ETRf9yei1U48C5MmfJmV9AiLYYBKPMq/W+/WRpQmCQ==",
                "requires": {
                "pkg-dir": "^3.0.0",
                  "resolve-cwd": "^2.0.0"
              }
            },
            "imurmurhash": {
              "version": "0.1.4",
                "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
                "integrity": "sha1-khi5srkoojixPcT7a21XbyMUU+o="
            },
            "in-publish": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/in-publish/-/in-publish-2.0.0.tgz",
                "integrity": "sha1-4g/146KvwmkDILbcVSaCqcf631E="
            },
            "indent-string": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-2.1.0.tgz",
                "integrity": "sha1-ji1INIdCEhtKghi3oTfppSBJ3IA=",
                "requires": {
                "repeating": "^2.0.0"
              }
            },
            "indexes-of": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/indexes-of/-/indexes-of-1.0.1.tgz",
                "integrity": "sha1-8w9xbI4r00bHtn0985FVZqfAVgc="
            },
            "infer-owner": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/infer-owner/-/infer-owner-1.0.4.tgz",
                "integrity": "sha512-IClj+Xz94+d7irH5qRyfJonOdfTzuDaifE6ZPWfx0N0+/ATZCbuTPq2prFl526urkQd90WyUKIh1DfBQ2hMz9A=="
            },
            "inflight": {
              "version": "1.0.6",
                "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
                "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
                "requires": {
                "once": "^1.3.0",
                  "wrappy": "1"
              }
            },
            "inherits": {
              "version": "2.0.3",
                "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.3.tgz",
                "integrity": "sha1-Yzwsg+PaQqUC9SRmAiSA9CCCYd4="
            },
            "ini": {
              "version": "1.3.5",
                "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.5.tgz",
                "integrity": "sha512-RZY5huIKCMRWDUqZlEi72f/lmXKMvuszcMBduliQ3nnWbx9X/ZBQO7DijMEYS9EhHBb2qacRUMtC7svLwe0lcw=="
            },
            "inquirer": {
              "version": "7.0.3",
                "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-7.0.3.tgz",
                "integrity": "sha512-+OiOVeVydu4hnCGLCSX+wedovR/Yzskv9BFqUNNKq9uU2qg7LCcCo3R86S2E7WLo0y/x2pnEZfZe1CoYnORUAw==",
                "dev": true,
                "requires": {
                "ansi-escapes": "^4.2.1",
                  "chalk": "^2.4.2",
                  "cli-cursor": "^3.1.0",
                  "cli-width": "^2.0.0",
                  "external-editor": "^3.0.3",
                  "figures": "^3.0.0",
                  "lodash": "^4.17.15",
                  "mute-stream": "0.0.8",
                  "run-async": "^2.2.0",
                  "rxjs": "^6.5.3",
                  "string-width": "^4.1.0",
                  "strip-ansi": "^5.1.0",
                  "through": "^2.3.6"
              },
              "dependencies": {
                "ansi-escapes": {
                  "version": "4.3.0",
                    "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.0.tgz",
                    "integrity": "sha512-EiYhwo0v255HUL6eDyuLrXEkTi7WwVCLAw+SeOQ7M7qdun1z1pum4DEm/nuqIVbPvi9RPPc9k9LbyBv6H0DwVg==",
                    "dev": true,
                    "requires": {
                    "type-fest": "^0.8.1"
                  }
                },
                "ansi-regex": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
                    "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
                    "dev": true
                },
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "dev": true,
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  }
                },
                "cli-cursor": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz",
                    "integrity": "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==",
                    "dev": true,
                    "requires": {
                    "restore-cursor": "^3.1.0"
                  }
                },
                "figures": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/figures/-/figures-3.1.0.tgz",
                    "integrity": "sha512-ravh8VRXqHuMvZt/d8GblBeqDMkdJMBdv/2KntFH+ra5MXkO7nxNKpzQ3n6QD/2da1kH0aWmNISdvhM7gl2gVg==",
                    "dev": true,
                    "requires": {
                    "escape-string-regexp": "^1.0.5"
                  }
                },
                "is-fullwidth-code-point": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
                    "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
                    "dev": true
                },
                "mimic-fn": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
                    "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
                    "dev": true
                },
                "mute-stream": {
                  "version": "0.0.8",
                    "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.8.tgz",
                    "integrity": "sha512-nnbWWOkoWyUsTjKrhgD0dcz22mdkSnpYqbEjIm2nhwhuxlSkpywJmBo8h0ZqJdkp73mb90SssHkN4rsRaBAfAA==",
                    "dev": true
                },
                "onetime": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.0.tgz",
                    "integrity": "sha512-5NcSkPHhwTVFIQN+TUqXoS5+dlElHXdpAWu9I0HP20YOtIi+aZ0Ct82jdlILDxjLEAWwvm+qj1m6aEtsDVmm6Q==",
                    "dev": true,
                    "requires": {
                    "mimic-fn": "^2.1.0"
                  }
                },
                "restore-cursor": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-3.1.0.tgz",
                    "integrity": "sha512-l+sSefzHpj5qimhFSE5a8nufZYAM3sBSVMAPtYkmC+4EH2anSGaEMXSD0izRQbu9nfyQ9y5JrVmp7E8oZrUjvA==",
                    "dev": true,
                    "requires": {
                    "onetime": "^5.1.0",
                      "signal-exit": "^3.0.2"
                  }
                },
                "rxjs": {
                  "version": "6.5.4",
                    "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.4.tgz",
                    "integrity": "sha512-naMQXcgEo3csAEGvw/NydRA0fuS2nDZJiw1YUWFKU7aPPAPGZEsD4Iimit96qwCieH6y614MCLYwdkrWx7z/7Q==",
                    "dev": true,
                    "requires": {
                    "tslib": "^1.9.0"
                  }
                },
                "string-width": {
                  "version": "4.2.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.0.tgz",
                    "integrity": "sha512-zUz5JD+tgqtuDjMhwIg5uFVV3dtqZ9yQJlZVfq4I01/K5Paj5UHj7VyrQOJvzawSVlKpObApbfD0Ed6yJc+1eg==",
                    "dev": true,
                    "requires": {
                    "emoji-regex": "^8.0.0",
                      "is-fullwidth-code-point": "^3.0.0",
                      "strip-ansi": "^6.0.0"
                  },
                  "dependencies": {
                    "strip-ansi": {
                      "version": "6.0.0",
                        "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
                        "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
                        "dev": true,
                        "requires": {
                        "ansi-regex": "^5.0.0"
                      }
                    }
                  }
                }
              }
            },
            "internal-ip": {
              "version": "4.3.0",
                "resolved": "https://registry.npmjs.org/internal-ip/-/internal-ip-4.3.0.tgz",
                "integrity": "sha512-S1zBo1D6zcsyuC6PMmY5+55YMILQ9av8lotMx447Bq6SAgo/sDK6y6uUKmuYhW7eacnIhFfsPmCNYdDzsnnDCg==",
                "requires": {
                "default-gateway": "^4.2.0",
                  "ipaddr.js": "^1.9.0"
              }
            },
            "invariant": {
              "version": "2.2.4",
                "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
                "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
                "requires": {
                "loose-envify": "^1.0.0"
              }
            },
            "invert-kv": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-1.0.0.tgz",
                "integrity": "sha1-EEqOSqym09jNFXqO+L+rLXo//bY="
            },
            "ip": {
              "version": "1.1.5",
                "resolved": "https://registry.npmjs.org/ip/-/ip-1.1.5.tgz",
                "integrity": "sha1-vd7XARQpCCjAoDnnLvJfWq7ENUo="
            },
            "ip-regex": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/ip-regex/-/ip-regex-2.1.0.tgz",
                "integrity": "sha1-+ni/XS5pE8kRzp+BnuUUa7bYROk="
            },
            "ip-validator": {
              "version": "0.0.1",
                "resolved": "https://registry.npmjs.org/ip-validator/-/ip-validator-0.0.1.tgz",
                "integrity": "sha1-ZZ62AB04w1vqtRRVovdRuEMpnrU="
            },
            "ipaddr.js": {
              "version": "1.9.0",
                "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.0.tgz",
                "integrity": "sha512-M4Sjn6N/+O6/IXSJseKqHoFc+5FdGJ22sXqnjTpdZweHK64MzEPAyQZyEU3R/KRv2GLoa7nNtg/C2Ev6m7z+eA=="
            },
            "iplocation": {
              "version": "6.1.0",
                "resolved": "https://registry.npmjs.org/iplocation/-/iplocation-6.1.0.tgz",
                "integrity": "sha512-odCKZpe7PQ4fpZ8Jdl/hKuMobhw5NDcA58fOCX3Zo4BtopvxI3jhwiEPgPW9ACOLzGYoTITF/oiuYoY97uAjWQ==",
                "requires": {
                "debug": "^3.0.0",
                  "ip-validator": "0.0.1",
                  "request": "=2.88.0"
              },
              "dependencies": {
                "debug": {
                  "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                }
              }
            },
            "is-absolute-url": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-absolute-url/-/is-absolute-url-2.1.0.tgz",
                "integrity": "sha1-UFMN+4T8yap9vnhS6Do3uTufKqY="
            },
            "is-accessor-descriptor": {
              "version": "0.1.6",
                "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",
                "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",
                "requires": {
                "kind-of": "^3.0.2"
              }
            },
            "is-arguments": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/is-arguments/-/is-arguments-1.0.4.tgz",
                "integrity": "sha512-xPh0Rmt8NE65sNzvyUmWgI1tz3mKq74lGA0mL8LYZcoIzKOzDh6HmrYm3d18k60nHerC8A9Km8kYu87zfSFnLA=="
            },
            "is-arrayish": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
                "integrity": "sha1-d8mYQFJ6qOyxqLppe4BkWnqSap0="
            },
            "is-binary-path": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-1.0.1.tgz",
                "integrity": "sha1-dfFmQrSA8YenEcgUFh/TpKdlWJg=",
                "requires": {
                "binary-extensions": "^1.0.0"
              }
            },
            "is-buffer": {
              "version": "1.1.6",
                "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-1.1.6.tgz",
                "integrity": "sha512-NcdALwpXkTm5Zvvbk7owOUSvVvBKDgKP5/ewfXEznmQFfs4ZRmanOeKBTjRVjka3QFoN6XJ+9F3USqfHqTaU5w=="
            },
            "is-builtin-module": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/is-builtin-module/-/is-builtin-module-1.0.0.tgz",
                "integrity": "sha1-VAVy0096wxGfj3bDDLwbHgN6/74=",
                "requires": {
                "builtin-modules": "^1.0.0"
              }
            },
            "is-callable": {
              "version": "1.1.5",
                "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.1.5.tgz",
                "integrity": "sha512-ESKv5sMCJB2jnHTWZ3O5itG+O128Hsus4K4Qh1h2/cgn2vbgnLSVqfV46AeJA9D5EeeLa9w81KUXMtn34zhX+Q=="
            },
            "is-ci": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/is-ci/-/is-ci-2.0.0.tgz",
                "integrity": "sha512-YfJT7rkpQB0updsdHLGWrvhBJfcfzNNawYDNIyQXJz0IViGf75O8EBPKSdvw2rF+LGCsX4FZ8tcr3b19LcZq4w==",
                "requires": {
                "ci-info": "^2.0.0"
              }
            },
            "is-color-stop": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/is-color-stop/-/is-color-stop-1.1.0.tgz",
                "integrity": "sha1-z/9HGu5N1cnhWFmPvhKWe1za00U=",
                "requires": {
                "css-color-names": "^0.0.4",
                  "hex-color-regex": "^1.1.0",
                  "hsl-regex": "^1.0.0",
                  "hsla-regex": "^1.0.0",
                  "rgb-regex": "^1.0.1",
                  "rgba-regex": "^1.0.0"
              }
            },
            "is-data-descriptor": {
              "version": "0.1.4",
                "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",
                "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",
                "requires": {
                "kind-of": "^3.0.2"
              }
            },
            "is-date-object": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.0.1.tgz",
                "integrity": "sha1-mqIOtq7rv/d/vTPnTKAbM1gdOhY="
            },
            "is-descriptor": {
              "version": "0.1.6",
                "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",
                "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",
                "requires": {
                "is-accessor-descriptor": "^0.1.6",
                  "is-data-descriptor": "^0.1.4",
                  "kind-of": "^5.0.0"
              },
              "dependencies": {
                "kind-of": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
                    "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw=="
                }
              }
            },
            "is-directory": {
              "version": "0.3.1",
                "resolved": "https://registry.npmjs.org/is-directory/-/is-directory-0.3.1.tgz",
                "integrity": "sha1-YTObbyR1/Hcv2cnYP1yFddwVSuE="
            },
            "is-dotfile": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/is-dotfile/-/is-dotfile-1.0.3.tgz",
                "integrity": "sha1-pqLzL/0t+wT1yiXs0Pa4PPeYoeE=",
                "dev": true,
                "optional": true
            },
            "is-equal-shallow": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/is-equal-shallow/-/is-equal-shallow-0.1.3.tgz",
                "integrity": "sha1-IjgJj8Ih3gvPpdnqxMRdY4qhxTQ=",
                "dev": true,
                "optional": true,
                "requires": {
                "is-primitive": "^2.0.0"
              }
            },
            "is-extendable": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-0.1.1.tgz",
                "integrity": "sha1-YrEQ4omkcUGOPsNqYX1HLjAd/Ik="
            },
            "is-extglob": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-1.0.0.tgz",
                "integrity": "sha1-rEaBd8SUNAWgkvyPKXYMb/xiBsA=",
                "dev": true,
                "optional": true
            },
            "is-finite": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/is-finite/-/is-finite-1.0.2.tgz",
                "integrity": "sha1-zGZ3aVYCvlUO8R6LSqYwU0K20Ko=",
                "requires": {
                "number-is-nan": "^1.0.0"
              }
            },
            "is-fullwidth-code-point": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
                "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
            },
            "is-generator-fn": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-generator-fn/-/is-generator-fn-2.1.0.tgz",
                "integrity": "sha512-cTIB4yPYL/Grw0EaSzASzg6bBy9gqCofvWN8okThAYIxKJZC+udlRAmGbM0XLeniEJSs8uEgHPGuHSe1XsOLSQ=="
            },
            "is-glob": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-2.0.1.tgz",
                "integrity": "sha1-0Jb5JqPe1WAPP9/ZEZjLCIjC2GM=",
                "dev": true,
                "optional": true,
                "requires": {
                "is-extglob": "^1.0.0"
              }
            },
            "is-number": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/is-number/-/is-number-3.0.0.tgz",
                "integrity": "sha1-JP1iAaR4LPUFYcgQJ2r8fRLXEZU=",
                "requires": {
                "kind-of": "^3.0.2"
              }
            },
            "is-obj": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-1.0.1.tgz",
                "integrity": "sha1-PkcprB9f3gJc19g6iW2rn09n2w8="
            },
            "is-path-cwd": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/is-path-cwd/-/is-path-cwd-2.2.0.tgz",
                "integrity": "sha512-w942bTcih8fdJPJmQHFzkS76NEP8Kzzvmw92cXsazb8intwLqPibPPdXf4ANdKV3rYMuuQYGIWtvz9JilB3NFQ=="
            },
            "is-path-in-cwd": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-path-in-cwd/-/is-path-in-cwd-2.1.0.tgz",
                "integrity": "sha512-rNocXHgipO+rvnP6dk3zI20RpOtrAM/kzbB258Uw5BWr3TpXi861yzjo16Dn4hUox07iw5AyeMLHWsujkjzvRQ==",
                "requires": {
                "is-path-inside": "^2.1.0"
              }
            },
            "is-path-inside": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-2.1.0.tgz",
                "integrity": "sha512-wiyhTzfDWsvwAW53OBWF5zuvaOGlZ6PwYxAbPVDhpm+gM09xKQGjBq/8uYN12aDvMxnAnq3dxTyoSoRNmg5YFg==",
                "requires": {
                "path-is-inside": "^1.0.2"
              }
            },
            "is-plain-obj": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-1.1.0.tgz",
                "integrity": "sha1-caUMhCnfync8kqOQpKA7OfzVHT4="
            },
            "is-plain-object": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/is-plain-object/-/is-plain-object-2.0.4.tgz",
                "integrity": "sha512-h5PpgXkWitc38BBMYawTYMWJHFZJVnBquFE57xFpjB8pJFiF6gZ+bU+WyI/yqXiFR5mdLsgYNaPe8uao6Uv9Og==",
                "requires": {
                "isobject": "^3.0.1"
              }
            },
            "is-posix-bracket": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/is-posix-bracket/-/is-posix-bracket-0.1.1.tgz",
                "integrity": "sha1-MzTceXdDaOkvAW5vvAqI9c1ua8Q=",
                "dev": true,
                "optional": true
            },
            "is-primitive": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/is-primitive/-/is-primitive-2.0.0.tgz",
                "integrity": "sha1-IHurkWOEmcB7Kt8kCkGochADRXU=",
                "dev": true,
                "optional": true
            },
            "is-promise": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-2.1.0.tgz",
                "integrity": "sha1-eaKp7OfwlugPNtKy87wWwf9L8/o="
            },
            "is-regex": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.0.5.tgz",
                "integrity": "sha512-vlKW17SNq44owv5AQR3Cq0bQPEb8+kF3UKZ2fiZNOWtztYE5i0CzCZxFDwO58qAOWtxdBRVO/V5Qin1wjCqFYQ==",
                "requires": {
                "has": "^1.0.3"
              }
            },
            "is-regexp": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/is-regexp/-/is-regexp-1.0.0.tgz",
                "integrity": "sha1-/S2INUXEa6xaYz57mgnof6LLUGk="
            },
            "is-resolvable": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/is-resolvable/-/is-resolvable-1.1.0.tgz",
                "integrity": "sha512-qgDYXFSR5WvEfuS5dMj6oTMEbrrSaM0CrFk2Yiq/gXnBvD9pMa2jGXxyhGLfvhZpuMZe18CJpFxAt3CRs42NMg=="
            },
            "is-root": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/is-root/-/is-root-2.1.0.tgz",
                "integrity": "sha512-AGOriNp96vNBd3HtU+RzFEc75FfR5ymiYv8E553I71SCeXBiMsVDUtdio1OEFvrPyLIQ9tVR5RxXIFe5PUFjMg=="
            },
            "is-stream": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-1.1.0.tgz",
                "integrity": "sha1-EtSj3U5o4Lec6428hBc66A2RykQ="
            },
            "is-svg": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/is-svg/-/is-svg-3.0.0.tgz",
                "integrity": "sha512-gi4iHK53LR2ujhLVVj+37Ykh9GLqYHX6JOVXbLAucaG/Cqw9xwdFOjDM2qeifLs1sF1npXXFvDu0r5HNgCMrzQ==",
                "requires": {
                "html-comment-regex": "^1.1.0"
              }
            },
            "is-symbol": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.2.tgz",
                "integrity": "sha512-HS8bZ9ox60yCJLH9snBpIwv9pYUAkcuLhSA1oero1UB5y9aiQpRA8y2ex945AOtCZL1lJDeIk3G5LthswI46Lw==",
                "requires": {
                "has-symbols": "^1.0.0"
              }
            },
            "is-typedarray": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
                "integrity": "sha1-5HnICFjfDBsR3dppQPlgEfzaSpo="
            },
            "is-utf8": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/is-utf8/-/is-utf8-0.2.1.tgz",
                "integrity": "sha1-Sw2hRCEE0bM2NA6AeX6GXPOffXI="
            },
            "is-what": {
              "version": "3.5.0",
                "resolved": "https://registry.npmjs.org/is-what/-/is-what-3.5.0.tgz",
                "integrity": "sha512-00pwt/Jf7IaRh5m2Dp93Iw8LG2cd3OpDj3NrD1XPNUpAWVxPvBP296p4IiGmIU4Ur0f3f56IoIM+fS2pFYF+tQ=="
            },
            "is-windows": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/is-windows/-/is-windows-1.0.2.tgz",
                "integrity": "sha512-eXK1UInq2bPmjyX6e3VHIzMLobc4J94i4AWn+Hpq3OU5KkrRC96OAcR3PRJ/pGu6m8TRnBHP9dkXQVsT/COVIA=="
            },
            "is-wsl": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-1.1.0.tgz",
                "integrity": "sha1-HxbkqiKwTRM2tmGIpmrzxgDDpm0="
            },
            "isarray": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/isarray/-/isarray-1.0.0.tgz",
                "integrity": "sha1-u5NdSFgsuhaMBoNJV6VKPgcSTxE="
            },
            "isexe": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
                "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA="
            },
            "isobject": {
              "version": "3.0.1",
                "resolved": "https://registry.npmjs.org/isobject/-/isobject-3.0.1.tgz",
                "integrity": "sha1-TkMekrEalzFjaqH5yNHMvP2reN8="
            },
            "isomorphic-fetch": {
              "version": "2.2.1",
                "resolved": "https://registry.npmjs.org/isomorphic-fetch/-/isomorphic-fetch-2.2.1.tgz",
                "integrity": "sha1-YRrhrPFPXoH3KVB0coGf6XM1WKk=",
                "requires": {
                "node-fetch": "^1.0.1",
                  "whatwg-fetch": ">=0.10.0"
              }
            },
            "isstream": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/isstream/-/isstream-0.1.2.tgz",
                "integrity": "sha1-R+Y/evVa+m+S4VAOaQ64uFKcCZo="
            },
            "istanbul-lib-coverage": {
              "version": "2.0.5",
                "resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-2.0.5.tgz",
                "integrity": "sha512-8aXznuEPCJvGnMSRft4udDRDtb1V3pkQkMMI5LI+6HuQz5oQ4J2UFn1H82raA3qJtyOLkkwVqICBQkjnGtn5mA=="
            },
            "istanbul-lib-instrument": {
              "version": "3.3.0",
                "resolved": "https://registry.npmjs.org/istanbul-lib-instrument/-/istanbul-lib-instrument-3.3.0.tgz",
                "integrity": "sha512-5nnIN4vo5xQZHdXno/YDXJ0G+I3dAm4XgzfSVTPLQpj/zAV2dV6Juy0yaf10/zrJOJeHoN3fraFe+XRq2bFVZA==",
                "requires": {
                "@babel/generator": "^7.4.0",
                  "@babel/parser": "^7.4.3",
                  "@babel/template": "^7.4.0",
                  "@babel/traverse": "^7.4.3",
                  "@babel/types": "^7.4.0",
                  "istanbul-lib-coverage": "^2.0.5",
                  "semver": "^6.0.0"
              },
              "dependencies": {
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                }
              }
            },
            "istanbul-lib-report": {
              "version": "2.0.8",
                "resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-2.0.8.tgz",
                "integrity": "sha512-fHBeG573EIihhAblwgxrSenp0Dby6tJMFR/HvlerBsrCTD5bkUuoNtn3gVh29ZCS824cGGBPn7Sg7cNk+2xUsQ==",
                "requires": {
                "istanbul-lib-coverage": "^2.0.5",
                  "make-dir": "^2.1.0",
                  "supports-color": "^6.1.0"
              },
              "dependencies": {
                "supports-color": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
                    "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
                    "requires": {
                    "has-flag": "^3.0.0"
                  }
                }
              }
            },
            "istanbul-lib-source-maps": {
              "version": "3.0.6",
                "resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-3.0.6.tgz",
                "integrity": "sha512-R47KzMtDJH6X4/YW9XTx+jrLnZnscW4VpNN+1PViSYTejLVPWv7oov+Duf8YQSPyVRUvueQqz1TcsC6mooZTXw==",
                "requires": {
                "debug": "^4.1.1",
                  "istanbul-lib-coverage": "^2.0.5",
                  "make-dir": "^2.1.0",
                  "rimraf": "^2.6.3",
                  "source-map": "^0.6.1"
              },
              "dependencies": {
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "istanbul-reports": {
              "version": "2.2.6",
                "resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-2.2.6.tgz",
                "integrity": "sha512-SKi4rnMyLBKe0Jy2uUdx28h8oG7ph2PPuQPvIAh31d+Ci+lSiEu4C+h3oBPuJ9+mPKhOyW0M8gY4U5NM1WLeXA==",
                "requires": {
                "handlebars": "^4.1.2"
              }
            },
            "jest": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest/-/jest-24.9.0.tgz",
                "integrity": "sha512-YvkBL1Zm7d2B1+h5fHEOdyjCG+sGMz4f8D86/0HiqJ6MB4MnDc8FgP5vdWsGnemOQro7lnYo8UakZ3+5A0jxGw==",
                "requires": {
                "import-local": "^2.0.0",
                  "jest-cli": "^24.9.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "cliui": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
                    "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
                    "requires": {
                    "string-width": "^3.1.0",
                      "strip-ansi": "^5.2.0",
                      "wrap-ansi": "^5.1.0"
                  }
                },
                "emoji-regex": {
                  "version": "7.0.3",
                    "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
                    "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
                },
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                },
                "get-caller-file": {
                  "version": "2.0.5",
                    "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
                    "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="
                },
                "jest-cli": {
                  "version": "24.9.0",
                    "resolved": "https://registry.npmjs.org/jest-cli/-/jest-cli-24.9.0.tgz",
                    "integrity": "sha512-+VLRKyitT3BWoMeSUIHRxV/2g8y9gw91Jh5z2UmXZzkZKpbC08CSehVxgHUwTpy+HwGcns/tqafQDJW7imYvGg==",
                    "requires": {
                    "@jest/core": "^24.9.0",
                      "@jest/test-result": "^24.9.0",
                      "@jest/types": "^24.9.0",
                      "chalk": "^2.0.1",
                      "exit": "^0.1.2",
                      "import-local": "^2.0.0",
                      "is-ci": "^2.0.0",
                      "jest-config": "^24.9.0",
                      "jest-util": "^24.9.0",
                      "jest-validate": "^24.9.0",
                      "prompts": "^2.0.1",
                      "realpath-native": "^1.1.0",
                      "yargs": "^13.3.0"
                  }
                },
                "require-main-filename": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
                    "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
                },
                "string-width": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "requires": {
                    "emoji-regex": "^7.0.1",
                      "is-fullwidth-code-point": "^2.0.0",
                      "strip-ansi": "^5.1.0"
                  }
                },
                "which-module": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
                    "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
                },
                "wrap-ansi": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
                    "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
                    "requires": {
                    "ansi-styles": "^3.2.0",
                      "string-width": "^3.0.0",
                      "strip-ansi": "^5.0.0"
                  }
                },
                "y18n": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
                    "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
                },
                "yargs": {
                  "version": "13.3.0",
                    "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.0.tgz",
                    "integrity": "sha512-2eehun/8ALW8TLoIl7MVaRUrg+yCnenu8B4kBlRxj3GJGDKU1Og7sMXPNm1BYyM1DOJmTZ4YeN/Nwxv+8XJsUA==",
                    "requires": {
                    "cliui": "^5.0.0",
                      "find-up": "^3.0.0",
                      "get-caller-file": "^2.0.1",
                      "require-directory": "^2.1.1",
                      "require-main-filename": "^2.0.0",
                      "set-blocking": "^2.0.0",
                      "string-width": "^3.0.0",
                      "which-module": "^2.0.0",
                      "y18n": "^4.0.0",
                      "yargs-parser": "^13.1.1"
                  }
                },
                "yargs-parser": {
                  "version": "13.1.1",
                    "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.1.tgz",
                    "integrity": "sha512-oVAVsHz6uFrg3XQheFII8ESO2ssAf9luWuAd6Wexsu4F3OtIW0o8IribPXYrD4WC24LWtPrJlGy87y5udK+dxQ==",
                    "requires": {
                    "camelcase": "^5.0.0",
                      "decamelize": "^1.2.0"
                  }
                }
              }
            },
            "jest-changed-files": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-changed-files/-/jest-changed-files-24.9.0.tgz",
                "integrity": "sha512-6aTWpe2mHF0DhL28WjdkO8LyGjs3zItPET4bMSeXU6T3ub4FPMw+mcOcbdGXQOAfmLcxofD23/5Bl9Z4AkFwqg==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "execa": "^1.0.0",
                  "throat": "^4.0.0"
              }
            },
            "jest-config": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-config/-/jest-config-24.9.0.tgz",
                "integrity": "sha512-RATtQJtVYQrp7fvWg6f5y3pEFj9I+H8sWw4aKxnDZ96mob5i5SD6ZEGWgMLXQ4LE8UurrjbdlLWdUeo+28QpfQ==",
                "requires": {
                "@babel/core": "^7.1.0",
                  "@jest/test-sequencer": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "babel-jest": "^24.9.0",
                  "chalk": "^2.0.1",
                  "glob": "^7.1.1",
                  "jest-environment-jsdom": "^24.9.0",
                  "jest-environment-node": "^24.9.0",
                  "jest-get-type": "^24.9.0",
                  "jest-jasmine2": "^24.9.0",
                  "jest-regex-util": "^24.3.0",
                  "jest-resolve": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-validate": "^24.9.0",
                  "micromatch": "^3.1.10",
                  "pretty-format": "^24.9.0",
                  "realpath-native": "^1.1.0"
              }
            },
            "jest-diff": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-diff/-/jest-diff-24.9.0.tgz",
                "integrity": "sha512-qMfrTs8AdJE2iqrTp0hzh7kTd2PQWrsFyj9tORoKmu32xjPjeE4NyjVRDz8ybYwqS2ik8N4hsIpiVTyFeo2lBQ==",
                "requires": {
                "chalk": "^2.0.1",
                  "diff-sequences": "^24.9.0",
                  "jest-get-type": "^24.9.0",
                  "pretty-format": "^24.9.0"
              }
            },
            "jest-docblock": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-docblock/-/jest-docblock-24.9.0.tgz",
                "integrity": "sha512-F1DjdpDMJMA1cN6He0FNYNZlo3yYmOtRUnktrT9Q37njYzC5WEaDdmbynIgy0L/IvXvvgsG8OsqhLPXTpfmZAA==",
                "requires": {
                "detect-newline": "^2.1.0"
              }
            },
            "jest-each": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-each/-/jest-each-24.9.0.tgz",
                "integrity": "sha512-ONi0R4BvW45cw8s2Lrx8YgbeXL1oCQ/wIDwmsM3CqM/nlblNCPmnC3IPQlMbRFZu3wKdQ2U8BqM6lh3LJ5Bsog==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "chalk": "^2.0.1",
                  "jest-get-type": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "pretty-format": "^24.9.0"
              }
            },
            "jest-environment-jsdom": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-environment-jsdom/-/jest-environment-jsdom-24.9.0.tgz",
                "integrity": "sha512-Zv9FV9NBRzLuALXjvRijO2351DRQeLYXtpD4xNvfoVFw21IOKNhZAEUKcbiEtjTkm2GsJ3boMVgkaR7rN8qetA==",
                "requires": {
                "@jest/environment": "^24.9.0",
                  "@jest/fake-timers": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "jest-mock": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jsdom": "^11.5.1"
              }
            },
            "jest-environment-jsdom-fourteen": {
              "version": "0.1.0",
                "resolved": "https://registry.npmjs.org/jest-environment-jsdom-fourteen/-/jest-environment-jsdom-fourteen-0.1.0.tgz",
                "integrity": "sha512-4vtoRMg7jAstitRzL4nbw83VmGH8Rs13wrND3Ud2o1fczDhMUF32iIrNKwYGgeOPUdfvZU4oy8Bbv+ni1fgVCA==",
                "requires": {
                "jest-mock": "^24.5.0",
                  "jest-util": "^24.5.0",
                  "jsdom": "^14.0.0"
              },
              "dependencies": {
                "jsdom": {
                  "version": "14.1.0",
                    "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-14.1.0.tgz",
                    "integrity": "sha512-O901mfJSuTdwU2w3Sn+74T+RnDVP+FuV5fH8tcPWyqrseRAb0s5xOtPgCFiPOtLcyK7CLIJwPyD83ZqQWvA5ng==",
                    "requires": {
                    "abab": "^2.0.0",
                      "acorn": "^6.0.4",
                      "acorn-globals": "^4.3.0",
                      "array-equal": "^1.0.0",
                      "cssom": "^0.3.4",
                      "cssstyle": "^1.1.1",
                      "data-urls": "^1.1.0",
                      "domexception": "^1.0.1",
                      "escodegen": "^1.11.0",
                      "html-encoding-sniffer": "^1.0.2",
                      "nwsapi": "^2.1.3",
                      "parse5": "5.1.0",
                      "pn": "^1.1.0",
                      "request": "^2.88.0",
                      "request-promise-native": "^1.0.5",
                      "saxes": "^3.1.9",
                      "symbol-tree": "^3.2.2",
                      "tough-cookie": "^2.5.0",
                      "w3c-hr-time": "^1.0.1",
                      "w3c-xmlserializer": "^1.1.2",
                      "webidl-conversions": "^4.0.2",
                      "whatwg-encoding": "^1.0.5",
                      "whatwg-mimetype": "^2.3.0",
                      "whatwg-url": "^7.0.0",
                      "ws": "^6.1.2",
                      "xml-name-validator": "^3.0.0"
                  }
                },
                "parse5": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/parse5/-/parse5-5.1.0.tgz",
                    "integrity": "sha512-fxNG2sQjHvlVAYmzBZS9YlDp6PTSSDwa98vkD4QgVDDCAo84z5X1t5XyJQ62ImdLXx5NdIIfihey6xpum9/gRQ=="
                },
                "tough-cookie": {
                  "version": "2.5.0",
                    "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.5.0.tgz",
                    "integrity": "sha512-nlLsUzgm1kfLXSXfRZMc1KLAugd4hqJHDTvc2hDIwS3mZAfMEuMbc03SujMF+GEcpaX/qboeycw6iO8JwVv2+g==",
                    "requires": {
                    "psl": "^1.1.28",
                      "punycode": "^2.1.1"
                  }
                },
                "whatwg-url": {
                  "version": "7.1.0",
                    "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-7.1.0.tgz",
                    "integrity": "sha512-WUu7Rg1DroM7oQvGWfOiAK21n74Gg+T4elXEQYkOhtyLeWiJFoOGLXPKI/9gzIie9CtwVLm8wtw6YJdKyxSjeg==",
                    "requires": {
                    "lodash.sortby": "^4.7.0",
                      "tr46": "^1.0.1",
                      "webidl-conversions": "^4.0.2"
                  }
                },
                "ws": {
                  "version": "6.2.1",
                    "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.1.tgz",
                    "integrity": "sha512-GIyAXC2cB7LjvpgMt9EKS2ldqr0MTrORaleiOno6TweZ6r3TKtoFQWay/2PceJ3RuBasOHzXNn5Lrw1X0bEjqA==",
                    "requires": {
                    "async-limiter": "~1.0.0"
                  }
                }
              }
            },
            "jest-environment-node": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-environment-node/-/jest-environment-node-24.9.0.tgz",
                "integrity": "sha512-6d4V2f4nxzIzwendo27Tr0aFm+IXWa0XEUnaH6nU0FMaozxovt+sfRvh4J47wL1OvF83I3SSTu0XK+i4Bqe7uA==",
                "requires": {
                "@jest/environment": "^24.9.0",
                  "@jest/fake-timers": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "jest-mock": "^24.9.0",
                  "jest-util": "^24.9.0"
              }
            },
            "jest-get-type": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-get-type/-/jest-get-type-24.9.0.tgz",
                "integrity": "sha512-lUseMzAley4LhIcpSP9Jf+fTrQ4a1yHQwLNeeVa2cEmbCGeoZAtYPOIv8JaxLD/sUpKxetKGP+gsHl8f8TSj8Q=="
            },
            "jest-haste-map": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-haste-map/-/jest-haste-map-24.9.0.tgz",
                "integrity": "sha512-kfVFmsuWui2Sj1Rp1AJ4D9HqJwE4uwTlS/vO+eRUaMmd54BFpli2XhMQnPC2k4cHFVbB2Q2C+jtI1AGLgEnCjQ==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "anymatch": "^2.0.0",
                  "fb-watchman": "^2.0.0",
                  "fsevents": "^1.2.7",
                  "graceful-fs": "^4.1.15",
                  "invariant": "^2.2.4",
                  "jest-serializer": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-worker": "^24.9.0",
                  "micromatch": "^3.1.10",
                  "sane": "^4.0.3",
                  "walker": "^1.0.7"
              },
              "dependencies": {
                "fsevents": {
                  "version": "1.2.11",
                    "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.11.tgz",
                    "integrity": "sha512-+ux3lx6peh0BpvY0JebGyZoiR4D+oYzdPZMKJwkZ+sFkNJzpL7tXc/wehS49gUAxg3tmMHPHZkA8JU2rhhgDHw==",
                    "optional": true,
                    "requires": {
                    "bindings": "^1.5.0",
                      "nan": "^2.12.1",
                      "node-pre-gyp": "*"
                  },
                  "dependencies": {
                    "abbrev": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "ansi-regex": {
                      "version": "2.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "aproba": {
                      "version": "1.2.0",
                        "bundled": true,
                        "optional": true
                    },
                    "are-we-there-yet": {
                      "version": "1.1.5",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "delegates": "^1.0.0",
                          "readable-stream": "^2.0.6"
                      }
                    },
                    "balanced-match": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "brace-expansion": {
                      "version": "1.1.11",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "balanced-match": "^1.0.0",
                          "concat-map": "0.0.1"
                      }
                    },
                    "chownr": {
                      "version": "1.1.3",
                        "bundled": true,
                        "optional": true
                    },
                    "code-point-at": {
                      "version": "1.1.0",
                        "bundled": true,
                        "optional": true
                    },
                    "concat-map": {
                      "version": "0.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "console-control-strings": {
                      "version": "1.1.0",
                        "bundled": true,
                        "optional": true
                    },
                    "core-util-is": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "debug": {
                      "version": "3.2.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ms": "^2.1.1"
                      }
                    },
                    "deep-extend": {
                      "version": "0.6.0",
                        "bundled": true,
                        "optional": true
                    },
                    "delegates": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "detect-libc": {
                      "version": "1.0.3",
                        "bundled": true,
                        "optional": true
                    },
                    "fs-minipass": {
                      "version": "1.2.7",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.6.0"
                      }
                    },
                    "fs.realpath": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "gauge": {
                      "version": "2.7.4",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "aproba": "^1.0.3",
                          "console-control-strings": "^1.0.0",
                          "has-unicode": "^2.0.0",
                          "object-assign": "^4.1.0",
                          "signal-exit": "^3.0.0",
                          "string-width": "^1.0.1",
                          "strip-ansi": "^3.0.1",
                          "wide-align": "^1.1.0"
                      }
                    },
                    "glob": {
                      "version": "7.1.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "fs.realpath": "^1.0.0",
                          "inflight": "^1.0.4",
                          "inherits": "2",
                          "minimatch": "^3.0.4",
                          "once": "^1.3.0",
                          "path-is-absolute": "^1.0.0"
                      }
                    },
                    "has-unicode": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "iconv-lite": {
                      "version": "0.4.24",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safer-buffer": ">= 2.1.2 < 3"
                      }
                    },
                    "ignore-walk": {
                      "version": "3.0.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minimatch": "^3.0.4"
                      }
                    },
                    "inflight": {
                      "version": "1.0.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "once": "^1.3.0",
                          "wrappy": "1"
                      }
                    },
                    "inherits": {
                      "version": "2.0.4",
                        "bundled": true,
                        "optional": true
                    },
                    "ini": {
                      "version": "1.3.5",
                        "bundled": true,
                        "optional": true
                    },
                    "is-fullwidth-code-point": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "number-is-nan": "^1.0.0"
                      }
                    },
                    "isarray": {
                      "version": "1.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "minimatch": {
                      "version": "3.0.4",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "brace-expansion": "^1.1.7"
                      }
                    },
                    "minimist": {
                      "version": "0.0.8",
                        "bundled": true,
                        "optional": true
                    },
                    "minipass": {
                      "version": "2.9.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.0"
                      }
                    },
                    "minizlib": {
                      "version": "1.3.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minipass": "^2.9.0"
                      }
                    },
                    "mkdirp": {
                      "version": "0.5.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "minimist": "0.0.8"
                      }
                    },
                    "ms": {
                      "version": "2.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "needle": {
                      "version": "2.4.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "debug": "^3.2.6",
                          "iconv-lite": "^0.4.4",
                          "sax": "^1.2.4"
                      }
                    },
                    "node-pre-gyp": {
                      "version": "0.14.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "detect-libc": "^1.0.2",
                          "mkdirp": "^0.5.1",
                          "needle": "^2.2.1",
                          "nopt": "^4.0.1",
                          "npm-packlist": "^1.1.6",
                          "npmlog": "^4.0.2",
                          "rc": "^1.2.7",
                          "rimraf": "^2.6.1",
                          "semver": "^5.3.0",
                          "tar": "^4.4.2"
                      }
                    },
                    "nopt": {
                      "version": "4.0.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "abbrev": "1",
                          "osenv": "^0.1.4"
                      }
                    },
                    "npm-bundled": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "npm-normalize-package-bin": "^1.0.1"
                      }
                    },
                    "npm-normalize-package-bin": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "npm-packlist": {
                      "version": "1.4.7",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ignore-walk": "^3.0.1",
                          "npm-bundled": "^1.0.1"
                      }
                    },
                    "npmlog": {
                      "version": "4.1.2",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "are-we-there-yet": "~1.1.2",
                          "console-control-strings": "~1.1.0",
                          "gauge": "~2.7.3",
                          "set-blocking": "~2.0.0"
                      }
                    },
                    "number-is-nan": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "object-assign": {
                      "version": "4.1.1",
                        "bundled": true,
                        "optional": true
                    },
                    "once": {
                      "version": "1.4.0",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "wrappy": "1"
                      }
                    },
                    "os-homedir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "os-tmpdir": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "osenv": {
                      "version": "0.1.5",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "os-homedir": "^1.0.0",
                          "os-tmpdir": "^1.0.0"
                      }
                    },
                    "path-is-absolute": {
                      "version": "1.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "process-nextick-args": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "rc": {
                      "version": "1.2.8",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "deep-extend": "^0.6.0",
                          "ini": "~1.3.0",
                          "minimist": "^1.2.0",
                          "strip-json-comments": "~2.0.1"
                      },
                      "dependencies": {
                        "minimist": {
                          "version": "1.2.0",
                            "bundled": true,
                            "optional": true
                        }
                      }
                    },
                    "readable-stream": {
                      "version": "2.3.6",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "core-util-is": "~1.0.0",
                          "inherits": "~2.0.3",
                          "isarray": "~1.0.0",
                          "process-nextick-args": "~2.0.0",
                          "safe-buffer": "~5.1.1",
                          "string_decoder": "~1.1.1",
                          "util-deprecate": "~1.0.1"
                      }
                    },
                    "rimraf": {
                      "version": "2.7.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "glob": "^7.1.3"
                      }
                    },
                    "safe-buffer": {
                      "version": "5.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "safer-buffer": {
                      "version": "2.1.2",
                        "bundled": true,
                        "optional": true
                    },
                    "sax": {
                      "version": "1.2.4",
                        "bundled": true,
                        "optional": true
                    },
                    "semver": {
                      "version": "5.7.1",
                        "bundled": true,
                        "optional": true
                    },
                    "set-blocking": {
                      "version": "2.0.0",
                        "bundled": true,
                        "optional": true
                    },
                    "signal-exit": {
                      "version": "3.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "string-width": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "code-point-at": "^1.0.0",
                          "is-fullwidth-code-point": "^1.0.0",
                          "strip-ansi": "^3.0.0"
                      }
                    },
                    "string_decoder": {
                      "version": "1.1.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "safe-buffer": "~5.1.0"
                      }
                    },
                    "strip-ansi": {
                      "version": "3.0.1",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "ansi-regex": "^2.0.0"
                      }
                    },
                    "strip-json-comments": {
                      "version": "2.0.1",
                        "bundled": true,
                        "optional": true
                    },
                    "tar": {
                      "version": "4.4.13",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "chownr": "^1.1.1",
                          "fs-minipass": "^1.2.5",
                          "minipass": "^2.8.6",
                          "minizlib": "^1.2.1",
                          "mkdirp": "^0.5.0",
                          "safe-buffer": "^5.1.2",
                          "yallist": "^3.0.3"
                      }
                    },
                    "util-deprecate": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "wide-align": {
                      "version": "1.1.3",
                        "bundled": true,
                        "optional": true,
                        "requires": {
                        "string-width": "^1.0.2 || 2"
                      }
                    },
                    "wrappy": {
                      "version": "1.0.2",
                        "bundled": true,
                        "optional": true
                    },
                    "yallist": {
                      "version": "3.1.1",
                        "bundled": true,
                        "optional": true
                    }
                  }
                }
              }
            },
            "jest-jasmine2": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-jasmine2/-/jest-jasmine2-24.9.0.tgz",
                "integrity": "sha512-Cq7vkAgaYKp+PsX+2/JbTarrk0DmNhsEtqBXNwUHkdlbrTBLtMJINADf2mf5FkowNsq8evbPc07/qFO0AdKTzw==",
                "requires": {
                "@babel/traverse": "^7.1.0",
                  "@jest/environment": "^24.9.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "chalk": "^2.0.1",
                  "co": "^4.6.0",
                  "expect": "^24.9.0",
                  "is-generator-fn": "^2.0.0",
                  "jest-each": "^24.9.0",
                  "jest-matcher-utils": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-runtime": "^24.9.0",
                  "jest-snapshot": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "pretty-format": "^24.9.0",
                  "throat": "^4.0.0"
              }
            },
            "jest-leak-detector": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-leak-detector/-/jest-leak-detector-24.9.0.tgz",
                "integrity": "sha512-tYkFIDsiKTGwb2FG1w8hX9V0aUb2ot8zY/2nFg087dUageonw1zrLMP4W6zsRO59dPkTSKie+D4rhMuP9nRmrA==",
                "requires": {
                "jest-get-type": "^24.9.0",
                  "pretty-format": "^24.9.0"
              }
            },
            "jest-matcher-utils": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-matcher-utils/-/jest-matcher-utils-24.9.0.tgz",
                "integrity": "sha512-OZz2IXsu6eaiMAwe67c1T+5tUAtQyQx27/EMEkbFAGiw52tB9em+uGbzpcgYVpA8wl0hlxKPZxrly4CXU/GjHA==",
                "requires": {
                "chalk": "^2.0.1",
                  "jest-diff": "^24.9.0",
                  "jest-get-type": "^24.9.0",
                  "pretty-format": "^24.9.0"
              }
            },
            "jest-message-util": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-message-util/-/jest-message-util-24.9.0.tgz",
                "integrity": "sha512-oCj8FiZ3U0hTP4aSui87P4L4jC37BtQwUMqk+zk/b11FR19BJDeZsZAvIHutWnmtw7r85UmR3CEWZ0HWU2mAlw==",
                "requires": {
                "@babel/code-frame": "^7.0.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "@types/stack-utils": "^1.0.1",
                  "chalk": "^2.0.1",
                  "micromatch": "^3.1.10",
                  "slash": "^2.0.0",
                  "stack-utils": "^1.0.1"
              }
            },
            "jest-mock": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-mock/-/jest-mock-24.9.0.tgz",
                "integrity": "sha512-3BEYN5WbSq9wd+SyLDES7AHnjH9A/ROBwmz7l2y+ol+NtSFO8DYiEBzoO1CeFc9a8DYy10EO4dDFVv/wN3zl1w==",
                "requires": {
                "@jest/types": "^24.9.0"
              }
            },
            "jest-pnp-resolver": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/jest-pnp-resolver/-/jest-pnp-resolver-1.2.1.tgz",
                "integrity": "sha512-pgFw2tm54fzgYvc/OHrnysABEObZCUNFnhjoRjaVOCN8NYc032/gVjPaHD4Aq6ApkSieWtfKAFQtmDKAmhupnQ=="
            },
            "jest-regex-util": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-regex-util/-/jest-regex-util-24.9.0.tgz",
                "integrity": "sha512-05Cmb6CuxaA+Ys6fjr3PhvV3bGQmO+2p2La4hFbU+W5uOc479f7FdLXUWXw4pYMAhhSZIuKHwSXSu6CsSBAXQA=="
            },
            "jest-resolve": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-resolve/-/jest-resolve-24.9.0.tgz",
                "integrity": "sha512-TaLeLVL1l08YFZAt3zaPtjiVvyy4oSA6CRe+0AFPPVX3Q/VI0giIWWoAvoS5L96vj9Dqxj4fB5p2qrHCmTU/MQ==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "browser-resolve": "^1.11.3",
                  "chalk": "^2.0.1",
                  "jest-pnp-resolver": "^1.2.1",
                  "realpath-native": "^1.1.0"
              }
            },
            "jest-resolve-dependencies": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-resolve-dependencies/-/jest-resolve-dependencies-24.9.0.tgz",
                "integrity": "sha512-Fm7b6AlWnYhT0BXy4hXpactHIqER7erNgIsIozDXWl5dVm+k8XdGVe1oTg1JyaFnOxarMEbax3wyRJqGP2Pq+g==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "jest-regex-util": "^24.3.0",
                  "jest-snapshot": "^24.9.0"
              }
            },
            "jest-runner": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-runner/-/jest-runner-24.9.0.tgz",
                "integrity": "sha512-KksJQyI3/0mhcfspnxxEOBueGrd5E4vV7ADQLT9ESaCzz02WnbdbKWIf5Mkaucoaj7obQckYPVX6JJhgUcoWWg==",
                "requires": {
                "@jest/console": "^24.7.1",
                  "@jest/environment": "^24.9.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "chalk": "^2.4.2",
                  "exit": "^0.1.2",
                  "graceful-fs": "^4.1.15",
                  "jest-config": "^24.9.0",
                  "jest-docblock": "^24.3.0",
                  "jest-haste-map": "^24.9.0",
                  "jest-jasmine2": "^24.9.0",
                  "jest-leak-detector": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-resolve": "^24.9.0",
                  "jest-runtime": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-worker": "^24.6.0",
                  "source-map-support": "^0.5.6",
                  "throat": "^4.0.0"
              },
              "dependencies": {
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  }
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                },
                "source-map-support": {
                  "version": "0.5.16",
                    "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.16.tgz",
                    "integrity": "sha512-efyLRJDr68D9hBBNIPWFjhpFzURh+KJykQwvMyW5UiZzYwoF6l4YMMDIJJEyFWxWCqfyxLzz6tSfUFR+kXXsVQ==",
                    "requires": {
                    "buffer-from": "^1.0.0",
                      "source-map": "^0.6.0"
                  }
                }
              }
            },
            "jest-runtime": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-runtime/-/jest-runtime-24.9.0.tgz",
                "integrity": "sha512-8oNqgnmF3v2J6PVRM2Jfuj8oX3syKmaynlDMMKQ4iyzbQzIG6th5ub/lM2bCMTmoTKM3ykcUYI2Pw9xwNtjMnw==",
                "requires": {
                "@jest/console": "^24.7.1",
                  "@jest/environment": "^24.9.0",
                  "@jest/source-map": "^24.3.0",
                  "@jest/transform": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "@types/yargs": "^13.0.0",
                  "chalk": "^2.0.1",
                  "exit": "^0.1.2",
                  "glob": "^7.1.3",
                  "graceful-fs": "^4.1.15",
                  "jest-config": "^24.9.0",
                  "jest-haste-map": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-mock": "^24.9.0",
                  "jest-regex-util": "^24.3.0",
                  "jest-resolve": "^24.9.0",
                  "jest-snapshot": "^24.9.0",
                  "jest-util": "^24.9.0",
                  "jest-validate": "^24.9.0",
                  "realpath-native": "^1.1.0",
                  "slash": "^2.0.0",
                  "strip-bom": "^3.0.0",
                  "yargs": "^13.3.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "cliui": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/cliui/-/cliui-5.0.0.tgz",
                    "integrity": "sha512-PYeGSEmmHM6zvoef2w8TPzlrnNpXIjTipYK780YswmIP9vjxmd6Y2a3CB2Ks6/AU8NHjZugXvo8w3oWM2qnwXA==",
                    "requires": {
                    "string-width": "^3.1.0",
                      "strip-ansi": "^5.2.0",
                      "wrap-ansi": "^5.1.0"
                  }
                },
                "emoji-regex": {
                  "version": "7.0.3",
                    "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
                    "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
                },
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                },
                "get-caller-file": {
                  "version": "2.0.5",
                    "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
                    "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="
                },
                "require-main-filename": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
                    "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
                },
                "string-width": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "requires": {
                    "emoji-regex": "^7.0.1",
                      "is-fullwidth-code-point": "^2.0.0",
                      "strip-ansi": "^5.1.0"
                  }
                },
                "which-module": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
                    "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
                },
                "wrap-ansi": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-5.1.0.tgz",
                    "integrity": "sha512-QC1/iN/2/RPVJ5jYK8BGttj5z83LmSKmvbvrXPNCLZSEb32KKVDJDl/MOt2N01qU2H/FkzEa9PKto1BqDjtd7Q==",
                    "requires": {
                    "ansi-styles": "^3.2.0",
                      "string-width": "^3.0.0",
                      "strip-ansi": "^5.0.0"
                  }
                },
                "y18n": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
                    "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
                },
                "yargs": {
                  "version": "13.3.0",
                    "resolved": "https://registry.npmjs.org/yargs/-/yargs-13.3.0.tgz",
                    "integrity": "sha512-2eehun/8ALW8TLoIl7MVaRUrg+yCnenu8B4kBlRxj3GJGDKU1Og7sMXPNm1BYyM1DOJmTZ4YeN/Nwxv+8XJsUA==",
                    "requires": {
                    "cliui": "^5.0.0",
                      "find-up": "^3.0.0",
                      "get-caller-file": "^2.0.1",
                      "require-directory": "^2.1.1",
                      "require-main-filename": "^2.0.0",
                      "set-blocking": "^2.0.0",
                      "string-width": "^3.0.0",
                      "which-module": "^2.0.0",
                      "y18n": "^4.0.0",
                      "yargs-parser": "^13.1.1"
                  }
                },
                "yargs-parser": {
                  "version": "13.1.1",
                    "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-13.1.1.tgz",
                    "integrity": "sha512-oVAVsHz6uFrg3XQheFII8ESO2ssAf9luWuAd6Wexsu4F3OtIW0o8IribPXYrD4WC24LWtPrJlGy87y5udK+dxQ==",
                    "requires": {
                    "camelcase": "^5.0.0",
                      "decamelize": "^1.2.0"
                  }
                }
              }
            },
            "jest-serializer": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-serializer/-/jest-serializer-24.9.0.tgz",
                "integrity": "sha512-DxYipDr8OvfrKH3Kel6NdED3OXxjvxXZ1uIY2I9OFbGg+vUkkg7AGvi65qbhbWNPvDckXmzMPbK3u3HaDO49bQ=="
            },
            "jest-snapshot": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-snapshot/-/jest-snapshot-24.9.0.tgz",
                "integrity": "sha512-uI/rszGSs73xCM0l+up7O7a40o90cnrk429LOiK3aeTvfC0HHmldbd81/B7Ix81KSFe1lwkbl7GnBGG4UfuDew==",
                "requires": {
                "@babel/types": "^7.0.0",
                  "@jest/types": "^24.9.0",
                  "chalk": "^2.0.1",
                  "expect": "^24.9.0",
                  "jest-diff": "^24.9.0",
                  "jest-get-type": "^24.9.0",
                  "jest-matcher-utils": "^24.9.0",
                  "jest-message-util": "^24.9.0",
                  "jest-resolve": "^24.9.0",
                  "mkdirp": "^0.5.1",
                  "natural-compare": "^1.4.0",
                  "pretty-format": "^24.9.0",
                  "semver": "^6.2.0"
              },
              "dependencies": {
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                }
              }
            },
            "jest-util": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-util/-/jest-util-24.9.0.tgz",
                "integrity": "sha512-x+cZU8VRmOJxbA1K5oDBdxQmdq0OIdADarLxk0Mq+3XS4jgvhG/oKGWcIDCtPG0HgjxOYvF+ilPJQsAyXfbNOg==",
                "requires": {
                "@jest/console": "^24.9.0",
                  "@jest/fake-timers": "^24.9.0",
                  "@jest/source-map": "^24.9.0",
                  "@jest/test-result": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "callsites": "^3.0.0",
                  "chalk": "^2.0.1",
                  "graceful-fs": "^4.1.15",
                  "is-ci": "^2.0.0",
                  "mkdirp": "^0.5.1",
                  "slash": "^2.0.0",
                  "source-map": "^0.6.0"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "jest-validate": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-validate/-/jest-validate-24.9.0.tgz",
                "integrity": "sha512-HPIt6C5ACwiqSiwi+OfSSHbK8sG7akG8eATl+IPKaeIjtPOeBUd/g3J7DghugzxrGjI93qS/+RPKe1H6PqvhRQ==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "camelcase": "^5.3.1",
                  "chalk": "^2.0.1",
                  "jest-get-type": "^24.9.0",
                  "leven": "^3.1.0",
                  "pretty-format": "^24.9.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                }
              }
            },
            "jest-watch-typeahead": {
              "version": "0.4.2",
                "resolved": "https://registry.npmjs.org/jest-watch-typeahead/-/jest-watch-typeahead-0.4.2.tgz",
                "integrity": "sha512-f7VpLebTdaXs81rg/oj4Vg/ObZy2QtGzAmGLNsqUS5G5KtSN68tFcIsbvNODfNyQxU78g7D8x77o3bgfBTR+2Q==",
                "requires": {
                "ansi-escapes": "^4.2.1",
                  "chalk": "^2.4.1",
                  "jest-regex-util": "^24.9.0",
                  "jest-watcher": "^24.3.0",
                  "slash": "^3.0.0",
                  "string-length": "^3.1.0",
                  "strip-ansi": "^5.0.0"
              },
              "dependencies": {
                "ansi-escapes": {
                  "version": "4.3.0",
                    "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.0.tgz",
                    "integrity": "sha512-EiYhwo0v255HUL6eDyuLrXEkTi7WwVCLAw+SeOQ7M7qdun1z1pum4DEm/nuqIVbPvi9RPPc9k9LbyBv6H0DwVg==",
                    "requires": {
                    "type-fest": "^0.8.1"
                  }
                },
                "slash": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
                    "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q=="
                },
                "string-length": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-length/-/string-length-3.1.0.tgz",
                    "integrity": "sha512-Ttp5YvkGm5v9Ijagtaz1BnN+k9ObpvS0eIBblPMp2YWL8FBmi9qblQ9fexc2k/CXFgrTIteU3jAw3payCnwSTA==",
                    "requires": {
                    "astral-regex": "^1.0.0",
                      "strip-ansi": "^5.2.0"
                  }
                }
              }
            },
            "jest-watcher": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-watcher/-/jest-watcher-24.9.0.tgz",
                "integrity": "sha512-+/fLOfKPXXYJDYlks62/4R4GoT+GU1tYZed99JSCOsmzkkF7727RqKrjNAxtfO4YpGv11wybgRvCjR73lK2GZw==",
                "requires": {
                "@jest/test-result": "^24.9.0",
                  "@jest/types": "^24.9.0",
                  "@types/yargs": "^13.0.0",
                  "ansi-escapes": "^3.0.0",
                  "chalk": "^2.0.1",
                  "jest-util": "^24.9.0",
                  "string-length": "^2.0.0"
              }
            },
            "jest-worker": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-24.9.0.tgz",
                "integrity": "sha512-51PE4haMSXcHohnSMdM42anbvZANYTqMrr52tVKPqqsPJMzoP6FYYDVqahX/HrAoKEKz3uUPzSvKs9A3qR4iVw==",
                "requires": {
                "merge-stream": "^2.0.0",
                  "supports-color": "^6.1.0"
              },
              "dependencies": {
                "supports-color": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
                    "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
                    "requires": {
                    "has-flag": "^3.0.0"
                  }
                }
              }
            },
            "js-base64": {
              "version": "2.5.1",
                "resolved": "https://registry.npmjs.org/js-base64/-/js-base64-2.5.1.tgz",
                "integrity": "sha512-M7kLczedRMYX4L8Mdh4MzyAMM9O5osx+4FcOQuTvr3A9F2D9S5JXheN0ewNbrvK2UatkTRhL5ejGmGSjNMiZuw=="
            },
            "js-file-download": {
              "version": "0.4.8",
                "resolved": "https://registry.npmjs.org/js-file-download/-/js-file-download-0.4.8.tgz",
                "integrity": "sha512-8xygX/IkjQbr/2nWqJnyc0IWOMvA1R/78HQVyexB22YZDBAEz2MG59s+ieLFKOkDFzyDDk3bezKXEjyGW5HPCw=="
            },
            "js-levenshtein": {
              "version": "1.1.6",
                "resolved": "https://registry.npmjs.org/js-levenshtein/-/js-levenshtein-1.1.6.tgz",
                "integrity": "sha512-X2BB11YZtrRqY4EnQcLX5Rh373zbK4alC1FW7D7MBhL2gtcC17cTnr6DmfHZeS0s2rTHjUTMMHfG7gO8SSdw+g=="
            },
            "js-tokens": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
                "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
            },
            "js-yaml": {
              "version": "3.13.1",
                "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.13.1.tgz",
                "integrity": "sha512-YfbcO7jXDdyj0DGxYVSlSeQNHbD7XPWvrVWeVUujrQEoZzWJIRrCPoyk6kL6IAjAG2IolMK4T0hNUe0HOUs5Jw==",
                "requires": {
                "argparse": "^1.0.7",
                  "esprima": "^4.0.0"
              }
            },
            "jsbn": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
                "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM="
            },
            "jsdom": {
              "version": "11.12.0",
                "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-11.12.0.tgz",
                "integrity": "sha512-y8Px43oyiBM13Zc1z780FrfNLJCXTL40EWlty/LXUtcjykRBNgLlCjWXpfSPBl2iv+N7koQN+dvqszHZgT/Fjw==",
                "requires": {
                "abab": "^2.0.0",
                  "acorn": "^5.5.3",
                  "acorn-globals": "^4.1.0",
                  "array-equal": "^1.0.0",
                  "cssom": ">= 0.3.2 < 0.4.0",
                  "cssstyle": "^1.0.0",
                  "data-urls": "^1.0.0",
                  "domexception": "^1.0.1",
                  "escodegen": "^1.9.1",
                  "html-encoding-sniffer": "^1.0.2",
                  "left-pad": "^1.3.0",
                  "nwsapi": "^2.0.7",
                  "parse5": "4.0.0",
                  "pn": "^1.1.0",
                  "request": "^2.87.0",
                  "request-promise-native": "^1.0.5",
                  "sax": "^1.2.4",
                  "symbol-tree": "^3.2.2",
                  "tough-cookie": "^2.3.4",
                  "w3c-hr-time": "^1.0.1",
                  "webidl-conversions": "^4.0.2",
                  "whatwg-encoding": "^1.0.3",
                  "whatwg-mimetype": "^2.1.0",
                  "whatwg-url": "^6.4.1",
                  "ws": "^5.2.0",
                  "xml-name-validator": "^3.0.0"
              },
              "dependencies": {
                "acorn": {
                  "version": "5.7.3",
                    "resolved": "https://registry.npmjs.org/acorn/-/acorn-5.7.3.tgz",
                    "integrity": "sha512-T/zvzYRfbVojPWahDsE5evJdHb3oJoQfFbsrKM7w5Zcs++Tr257tia3BmMP8XYVjp1S9RZXQMh7gao96BlqZOw=="
                }
              }
            },
            "jsesc": {
              "version": "2.5.2",
                "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
                "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA=="
            },
            "json-parse-better-errors": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
                "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw=="
            },
            "json-schema": {
              "version": "0.2.3",
                "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
                "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM="
            },
            "json-schema-traverse": {
              "version": "0.4.1",
                "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
                "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
            },
            "json-stable-stringify": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/json-stable-stringify/-/json-stable-stringify-1.0.1.tgz",
                "integrity": "sha1-mnWdOcXy/1A/1TAGRu1EX4jE+a8=",
                "requires": {
                "jsonify": "~0.0.0"
              }
            },
            "json-stable-stringify-without-jsonify": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
                "integrity": "sha1-nbe1lJatPzz+8wp1FC0tkwrXJlE="
            },
            "json-stringify-safe": {
              "version": "5.0.1",
                "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
                "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus="
            },
            "json2mq": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/json2mq/-/json2mq-0.2.0.tgz",
                "integrity": "sha1-tje9O6nqvhIsg+lyBIOusQ0skEo=",
                "requires": {
                "string-convert": "^0.2.0"
              }
            },
            "json3": {
              "version": "3.3.3",
                "resolved": "https://registry.npmjs.org/json3/-/json3-3.3.3.tgz",
                "integrity": "sha512-c7/8mbUsKigAbLkD5B010BK4D9LZm7A1pNItkEwiUZRpIN66exu/e7YQWysGun+TRKaJp8MhemM+VkfWv42aCA=="
            },
            "json5": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/json5/-/json5-2.1.1.tgz",
                "integrity": "sha512-l+3HXD0GEI3huGq1njuqtzYK8OYJyXMkOLtQ53pjWh89tvWS2h6l+1zMkYWqlb57+SiQodKZyvMEFb2X+KrFhQ==",
                "requires": {
                "minimist": "^1.2.0"
              }
            },
            "jsonfile": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
                "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
                "requires": {
                "graceful-fs": "^4.1.6"
              }
            },
            "jsonify": {
              "version": "0.0.0",
                "resolved": "https://registry.npmjs.org/jsonify/-/jsonify-0.0.0.tgz",
                "integrity": "sha1-LHS27kHZPKUbe1qu6PUDYx0lKnM="
            },
            "jsprim": {
              "version": "1.4.1",
                "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
                "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
                "requires": {
                "assert-plus": "1.0.0",
                  "extsprintf": "1.3.0",
                  "json-schema": "0.2.3",
                  "verror": "1.10.0"
              }
            },
            "jsx-ast-utils": {
              "version": "2.2.3",
                "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-2.2.3.tgz",
                "integrity": "sha512-EdIHFMm+1BPynpKOpdPqiOsvnIrInRGJD7bzPZdPkjitQEqpdpUuFpq4T0npZFKTiB3RhWFdGN+oqOJIdhDhQA==",
                "requires": {
                "array-includes": "^3.0.3",
                  "object.assign": "^4.1.0"
              }
            },
            "killable": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/killable/-/killable-1.0.1.tgz",
                "integrity": "sha512-LzqtLKlUwirEUyl/nicirVmNiPvYs7l5n8wOPP7fyJVpUPkvCnW/vuiXGpylGUlnPDnB7311rARzAt3Mhswpjg=="
            },
            "kind-of": {
              "version": "3.2.2",
                "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",
                "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",
                "requires": {
                "is-buffer": "^1.1.5"
              }
            },
            "kleur": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
                "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w=="
            },
            "last-call-webpack-plugin": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/last-call-webpack-plugin/-/last-call-webpack-plugin-3.0.0.tgz",
                "integrity": "sha512-7KI2l2GIZa9p2spzPIVZBYyNKkN+e/SQPpnjlTiPhdbDW3F86tdKKELxKpzJ5sgU19wQWsACULZmpTPYHeWO5w==",
                "requires": {
                "lodash": "^4.17.5",
                  "webpack-sources": "^1.1.0"
              }
            },
            "lazy-cache": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/lazy-cache/-/lazy-cache-1.0.4.tgz",
                "integrity": "sha1-odePw6UEdMuAhF07O24dpJpEbo4="
            },
            "lcid": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/lcid/-/lcid-1.0.0.tgz",
                "integrity": "sha1-MIrMr6C8SDo4Z7S28rlQYlHRuDU=",
                "requires": {
                "invert-kv": "^1.0.0"
              }
            },
            "left-pad": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz",
                "integrity": "sha512-XI5MPzVNApjAyhQzphX8BkmKsKUxD4LdyK24iZeQGinBN9yTQT3bFlCBy/aVx2HrNcqQGsdot8ghrjyrvMCoEA=="
            },
            "leven": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/leven/-/leven-3.1.0.tgz",
                "integrity": "sha512-qsda+H8jTaUaN/x5vzW2rzc+8Rw4TAQ/4KjB46IwK5VH+IlVeeeje/EoZRpiXvIqjFgK84QffqPztGI3VBLG1A=="
            },
            "levn": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
                "integrity": "sha1-OwmSTt+fCDwEkP3UwLxEIeBHZO4=",
                "requires": {
                "prelude-ls": "~1.1.2",
                  "type-check": "~0.3.2"
              }
            },
            "lines-and-columns": {
              "version": "1.1.6",
                "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.1.6.tgz",
                "integrity": "sha1-HADHQ7QzzQpOgHWPe2SldEDZ/wA="
            },
            "load-json-file": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-4.0.0.tgz",
                "integrity": "sha1-L19Fq5HjMhYjT9U62rZo607AmTs=",
                "requires": {
                "graceful-fs": "^4.1.2",
                  "parse-json": "^4.0.0",
                  "pify": "^3.0.0",
                  "strip-bom": "^3.0.0"
              },
              "dependencies": {
                "pify": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
                    "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
                }
              }
            },
            "loader-fs-cache": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/loader-fs-cache/-/loader-fs-cache-1.0.2.tgz",
                "integrity": "sha512-70IzT/0/L+M20jUlEqZhZyArTU6VKLRTYRDAYN26g4jfzpJqjipLL3/hgYpySqI9PwsVRHHFja0LfEmsx9X2Cw==",
                "requires": {
                "find-cache-dir": "^0.1.1",
                  "mkdirp": "0.5.1"
              },
              "dependencies": {
                "find-cache-dir": {
                  "version": "0.1.1",
                    "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-0.1.1.tgz",
                    "integrity": "sha1-yN765XyKUqinhPnjHFfHQumToLk=",
                    "requires": {
                    "commondir": "^1.0.1",
                      "mkdirp": "^0.5.1",
                      "pkg-dir": "^1.0.0"
                  }
                },
                "pkg-dir": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-1.0.0.tgz",
                    "integrity": "sha1-ektQio1bstYp1EcFb/TpyTFM89Q=",
                    "requires": {
                    "find-up": "^1.0.0"
                  }
                }
              }
            },
            "loader-runner": {
              "version": "2.4.0",
                "resolved": "https://registry.npmjs.org/loader-runner/-/loader-runner-2.4.0.tgz",
                "integrity": "sha512-Jsmr89RcXGIwivFY21FcRrisYZfvLMTWx5kOLc+JTxtpBOG6xML0vzbc6SEQG2FO9/4Fc3wW4LVcB5DmGflaRw=="
            },
            "loader-utils": {
              "version": "1.2.3",
                "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.2.3.tgz",
                "integrity": "sha512-fkpz8ejdnEMG3s37wGL07iSBDg99O9D5yflE9RGNH3hRdx9SOwYfnGYdZOUIZitN8E+E2vkq3MUMYMvPYl5ZZA==",
                "requires": {
                "big.js": "^5.2.2",
                  "emojis-list": "^2.0.0",
                  "json5": "^1.0.1"
              },
              "dependencies": {
                "json5": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
                    "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
                    "requires": {
                    "minimist": "^1.2.0"
                  }
                }
              }
            },
            "local-ip-url": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/local-ip-url/-/local-ip-url-1.0.2.tgz",
                "integrity": "sha512-7zT8W8l7n0Bcvd8z5UyWFOJ2gMfBTgSEKCAqiGdNJhipgx4dLpi+QPtDtO7c4gJ1SrKsyZZCF4wZvl4xNPbk3A=="
            },
            "locate-path": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
                "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
                "requires": {
                "p-locate": "^3.0.0",
                  "path-exists": "^3.0.0"
              }
            },
            "lodash": {
              "version": "4.17.15",
                "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.15.tgz",
                "integrity": "sha512-8xOcRHvCjnocdS5cpwXQXVzmmh5e5+saE2QGoeQmbKmRS6J3VQppPOIt0MnmE+4xlZoumy0GPG0D0MVIQbNA1A=="
            },
            "lodash._reinterpolate": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/lodash._reinterpolate/-/lodash._reinterpolate-3.0.0.tgz",
                "integrity": "sha1-DM8tiRZq8Ds2Y8eWU4t1rG4RTZ0="
            },
            "lodash.debounce": {
              "version": "4.0.8",
                "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
                "integrity": "sha1-gteb/zCmfEAF/9XiUVMArZyk168="
            },
            "lodash.memoize": {
              "version": "4.1.2",
                "resolved": "https://registry.npmjs.org/lodash.memoize/-/lodash.memoize-4.1.2.tgz",
                "integrity": "sha1-vMbEmkKihA7Zl/Mj6tpezRguC/4="
            },
            "lodash.sortby": {
              "version": "4.7.0",
                "resolved": "https://registry.npmjs.org/lodash.sortby/-/lodash.sortby-4.7.0.tgz",
                "integrity": "sha1-7dFMgk4sycHgsKG0K7UhBRakJDg="
            },
            "lodash.template": {
              "version": "4.5.0",
                "resolved": "https://registry.npmjs.org/lodash.template/-/lodash.template-4.5.0.tgz",
                "integrity": "sha512-84vYFxIkmidUiFxidA/KjjH9pAycqW+h980j7Fuz5qxRtO9pgB7MDFTdys1N7A5mcucRiDyEq4fusljItR1T/A==",
                "requires": {
                "lodash._reinterpolate": "^3.0.0",
                  "lodash.templatesettings": "^4.0.0"
              }
            },
            "lodash.templatesettings": {
              "version": "4.2.0",
                "resolved": "https://registry.npmjs.org/lodash.templatesettings/-/lodash.templatesettings-4.2.0.tgz",
                "integrity": "sha512-stgLz+i3Aa9mZgnjr/O+v9ruKZsPsndy7qPZOchbqk2cnTU1ZaldKK+v7m54WoKIyxiuMZTKT2H81F8BeAc3ZQ==",
                "requires": {
                "lodash._reinterpolate": "^3.0.0"
              }
            },
            "lodash.throttle": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/lodash.throttle/-/lodash.throttle-4.1.1.tgz",
                "integrity": "sha1-wj6RtxAkKscMN/HhzaknTMOb8vQ="
            },
            "lodash.unescape": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/lodash.unescape/-/lodash.unescape-4.0.1.tgz",
                "integrity": "sha1-vyJJiGzlFM2hEvrpIYzcBlIR/Jw="
            },
            "lodash.uniq": {
              "version": "4.5.0",
                "resolved": "https://registry.npmjs.org/lodash.uniq/-/lodash.uniq-4.5.0.tgz",
                "integrity": "sha1-0CJTc662Uq3BvILklFM5qEJ1R3M="
            },
            "loglevel": {
              "version": "1.6.6",
                "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.6.6.tgz",
                "integrity": "sha512-Sgr5lbboAUBo3eXCSPL4/KoVz3ROKquOjcctxmHIt+vol2DrqTQe3SwkKKuYhEiWB5kYa13YyopJ69deJ1irzQ=="
            },
            "loose-envify": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
                "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
                "requires": {
                "js-tokens": "^3.0.0 || ^4.0.0"
              }
            },
            "loud-rejection": {
              "version": "1.6.0",
                "resolved": "https://registry.npmjs.org/loud-rejection/-/loud-rejection-1.6.0.tgz",
                "integrity": "sha1-W0b4AUft7leIcPCG0Eghz5mOVR8=",
                "requires": {
                "currently-unhandled": "^0.4.1",
                  "signal-exit": "^3.0.0"
              }
            },
            "lower-case": {
              "version": "1.1.4",
                "resolved": "https://registry.npmjs.org/lower-case/-/lower-case-1.1.4.tgz",
                "integrity": "sha1-miyr0bno4K6ZOkv31YdcOcQujqw="
            },
            "lru-cache": {
              "version": "4.1.5",
                "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-4.1.5.tgz",
                "integrity": "sha512-sWZlbEP2OsHNkXrMl5GYk/jKk70MBng6UU4YI/qGDYbgf6YbP4EvmqISbXCoJiRKs+1bSpFHVgQxvJ17F2li5g==",
                "requires": {
                "pseudomap": "^1.0.2",
                  "yallist": "^2.1.2"
              }
            },
            "make-dir": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-2.1.0.tgz",
                "integrity": "sha512-LS9X+dc8KLxXCb8dni79fLIIUA5VyZoyjSMCwTluaXA0o27cCK0bhXkpgw+sTXVpPy/lSO57ilRixqk0vDmtRA==",
                "requires": {
                "pify": "^4.0.1",
                  "semver": "^5.6.0"
              },
              "dependencies": {
                "pify": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
                    "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g=="
                }
              }
            },
            "makeerror": {
              "version": "1.0.11",
                "resolved": "https://registry.npmjs.org/makeerror/-/makeerror-1.0.11.tgz",
                "integrity": "sha1-4BpckQnyr3lmDk6LlYd5AYT1qWw=",
                "requires": {
                "tmpl": "1.0.x"
              }
            },
            "mamacro": {
              "version": "0.0.3",
                "resolved": "https://registry.npmjs.org/mamacro/-/mamacro-0.0.3.tgz",
                "integrity": "sha512-qMEwh+UujcQ+kbz3T6V+wAmO2U8veoq2w+3wY8MquqwVA3jChfwY+Tk52GZKDfACEPjuZ7r2oJLejwpt8jtwTA=="
            },
            "map-age-cleaner": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/map-age-cleaner/-/map-age-cleaner-0.1.3.tgz",
                "integrity": "sha512-bJzx6nMoP6PDLPBFmg7+xRKeFZvFboMrGlxmNj9ClvX53KrmvM5bXFXEWjbz4cz1AFn+jWJ9z/DJSz7hrs0w3w==",
                "requires": {
                "p-defer": "^1.0.0"
              }
            },
            "map-cache": {
              "version": "0.2.2",
                "resolved": "https://registry.npmjs.org/map-cache/-/map-cache-0.2.2.tgz",
                "integrity": "sha1-wyq9C9ZSXZsFFkW7TyasXcmKDb8="
            },
            "map-obj": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/map-obj/-/map-obj-1.0.1.tgz",
                "integrity": "sha1-2TPOuSBdgr3PSIb2dCvcK03qFG0="
            },
            "map-visit": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/map-visit/-/map-visit-1.0.0.tgz",
                "integrity": "sha1-7Nyo8TFE5mDxtb1B8S80edmN+48=",
                "requires": {
                "object-visit": "^1.0.0"
              }
            },
            "math-random": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/math-random/-/math-random-1.0.4.tgz",
                "integrity": "sha512-rUxjysqif/BZQH2yhd5Aaq7vXMSx9NdEsQcyA07uEzIvxgI7zIr33gGsh+RU0/XjmQpCW7RsVof1vlkvQVCK5A==",
                "dev": true,
                "optional": true
            },
            "md5.js": {
              "version": "1.3.5",
                "resolved": "https://registry.npmjs.org/md5.js/-/md5.js-1.3.5.tgz",
                "integrity": "sha512-xitP+WxNPcTTOgnTJcrhM0xvdPepipPSf3I8EIpGKeFLjt3PlJLIDG3u8EX53ZIubkb+5U2+3rELYpEhHhzdkg==",
                "requires": {
                "hash-base": "^3.0.0",
                  "inherits": "^2.0.1",
                  "safe-buffer": "^5.1.2"
              }
            },
            "mdn-data": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/mdn-data/-/mdn-data-2.0.4.tgz",
                "integrity": "sha512-iV3XNKw06j5Q7mi6h+9vbx23Tv7JkjEVgKHW4pimwyDGWm0OIQntJJ+u1C6mg6mK1EaTv42XQ7w76yuzH7M2cA=="
            },
            "media-typer": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
                "integrity": "sha1-hxDXrwqmJvj/+hzgAWhUUmMlV0g="
            },
            "mem": {
              "version": "4.3.0",
                "resolved": "https://registry.npmjs.org/mem/-/mem-4.3.0.tgz",
                "integrity": "sha512-qX2bG48pTqYRVmDB37rn/6PT7LcR8T7oAX3bf99u1Tt1nzxYfxkgqDwUwolPlXweM0XzBOBFzSx4kfp7KP1s/w==",
                "requires": {
                "map-age-cleaner": "^0.1.1",
                  "mimic-fn": "^2.0.0",
                  "p-is-promise": "^2.0.0"
              },
              "dependencies": {
                "mimic-fn": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
                    "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg=="
                }
              }
            },
            "memoize-one": {
              "version": "5.1.1",
                "resolved": "https://registry.npmjs.org/memoize-one/-/memoize-one-5.1.1.tgz",
                "integrity": "sha512-HKeeBpWvqiVJD57ZUAsJNm71eHTykffzcLZVYWiVfQeI1rJtuEaS7hQiEpWfVVk18donPwJEcFKIkCmPJNOhHA=="
            },
            "memory-fs": {
              "version": "0.4.1",
                "resolved": "https://registry.npmjs.org/memory-fs/-/memory-fs-0.4.1.tgz",
                "integrity": "sha1-OpoguEYlI+RHz7x+i7gO1me/xVI=",
                "requires": {
                "errno": "^0.1.3",
                  "readable-stream": "^2.0.1"
              }
            },
            "meow": {
              "version": "3.7.0",
                "resolved": "https://registry.npmjs.org/meow/-/meow-3.7.0.tgz",
                "integrity": "sha1-cstmi0JSKCkKu/qFaJJYcwioAfs=",
                "requires": {
                "camelcase-keys": "^2.0.0",
                  "decamelize": "^1.1.2",
                  "loud-rejection": "^1.0.0",
                  "map-obj": "^1.0.1",
                  "minimist": "^1.1.3",
                  "normalize-package-data": "^2.3.4",
                  "object-assign": "^4.0.1",
                  "read-pkg-up": "^1.0.1",
                  "redent": "^1.0.0",
                  "trim-newlines": "^1.0.0"
              },
              "dependencies": {
                "load-json-file": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz",
                    "integrity": "sha1-lWkFcI1YtLq0wiYbBPWfMcmTdMA=",
                    "requires": {
                    "graceful-fs": "^4.1.2",
                      "parse-json": "^2.2.0",
                      "pify": "^2.0.0",
                      "pinkie-promise": "^2.0.0",
                      "strip-bom": "^2.0.0"
                  }
                },
                "parse-json": {
                  "version": "2.2.0",
                    "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
                    "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
                    "requires": {
                    "error-ex": "^1.2.0"
                  }
                },
                "read-pkg": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-1.1.0.tgz",
                    "integrity": "sha1-9f+qXs0pyzHAR0vKfXVra7KePyg=",
                    "requires": {
                    "load-json-file": "^1.0.0",
                      "normalize-package-data": "^2.3.2",
                      "path-type": "^1.0.0"
                  }
                },
                "read-pkg-up": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-1.0.1.tgz",
                    "integrity": "sha1-nWPBMnbAZZGNV/ACpX9AobZD+wI=",
                    "requires": {
                    "find-up": "^1.0.0",
                      "read-pkg": "^1.0.0"
                  }
                },
                "strip-bom": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-2.0.0.tgz",
                    "integrity": "sha1-YhmoVhZSBJHzV4i9vxRHqZx+aw4=",
                    "requires": {
                    "is-utf8": "^0.2.0"
                  }
                }
              }
            },
            "merge-anything": {
              "version": "2.4.4",
                "resolved": "https://registry.npmjs.org/merge-anything/-/merge-anything-2.4.4.tgz",
                "integrity": "sha512-l5XlriUDJKQT12bH+rVhAHjwIuXWdAIecGwsYjv2LJo+dA1AeRTmeQS+3QBpO6lEthBMDi2IUMpLC1yyRvGlwQ==",
                "requires": {
                "is-what": "^3.3.1"
              }
            },
            "merge-deep": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/merge-deep/-/merge-deep-3.0.2.tgz",
                "integrity": "sha512-T7qC8kg4Zoti1cFd8Cr0M+qaZfOwjlPDEdZIIPPB2JZctjaPM4fX+i7HOId69tAti2fvO6X5ldfYUONDODsrkA==",
                "requires": {
                "arr-union": "^3.1.0",
                  "clone-deep": "^0.2.4",
                  "kind-of": "^3.0.2"
              }
            },
            "merge-descriptors": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
                "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E="
            },
            "merge-stream": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
                "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w=="
            },
            "merge2": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.3.0.tgz",
                "integrity": "sha512-2j4DAdlBOkiSZIsaXk4mTE3sRS02yBHAtfy127xRV3bQUFqXkjHCHLW6Scv7DwNRbIWNHH8zpnz9zMaKXIdvYw=="
            },
            "methods": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
                "integrity": "sha1-VSmk1nZUE07cxSZmVoNbD4Ua/O4="
            },
            "microevent.ts": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/microevent.ts/-/microevent.ts-0.1.1.tgz",
                "integrity": "sha512-jo1OfR4TaEwd5HOrt5+tAZ9mqT4jmpNAusXtyfNzqVm9uiSYFZlKM1wYL4oU7azZW/PxQW53wM0S6OR1JHNa2g=="
            },
            "micromatch": {
              "version": "3.1.10",
                "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-3.1.10.tgz",
                "integrity": "sha512-MWikgl9n9M3w+bpsY3He8L+w9eF9338xRl8IAO5viDizwSzziFEyUzo2xrrloB64ADbTf8uA8vRqqttDTOmccg==",
                "requires": {
                "arr-diff": "^4.0.0",
                  "array-unique": "^0.3.2",
                  "braces": "^2.3.1",
                  "define-property": "^2.0.2",
                  "extend-shallow": "^3.0.2",
                  "extglob": "^2.0.4",
                  "fragment-cache": "^0.2.1",
                  "kind-of": "^6.0.2",
                  "nanomatch": "^1.2.9",
                  "object.pick": "^1.3.0",
                  "regex-not": "^1.0.0",
                  "snapdragon": "^0.8.1",
                  "to-regex": "^3.0.2"
              },
              "dependencies": {
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "miller-rabin": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/miller-rabin/-/miller-rabin-4.0.1.tgz",
                "integrity": "sha512-115fLhvZVqWwHPbClyntxEVfVDfl9DLLTuJvq3g2O/Oxi8AiNouAHvDSzHS0viUJc+V5vm3eq91Xwqn9dp4jRA==",
                "requires": {
                "bn.js": "^4.0.0",
                  "brorand": "^1.0.1"
              }
            },
            "mime": {
              "version": "2.4.4",
                "resolved": "https://registry.npmjs.org/mime/-/mime-2.4.4.tgz",
                "integrity": "sha512-LRxmNwziLPT828z+4YkNzloCFC2YM4wrB99k+AV5ZbEyfGNWfG8SO1FUXLmLDBSo89NrJZ4DIWeLjy1CHGhMGA=="
            },
            "mime-db": {
              "version": "1.43.0",
                "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.43.0.tgz",
                "integrity": "sha512-+5dsGEEovYbT8UY9yD7eE4XTc4UwJ1jBYlgaQQF38ENsKR3wj/8q8RFZrF9WIZpB2V1ArTVFUva8sAul1NzRzQ=="
            },
            "mime-types": {
              "version": "2.1.26",
                "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.26.tgz",
                "integrity": "sha512-01paPWYgLrkqAyrlDorC1uDwl2p3qZT7yl806vW7DvDoxwXi46jsjFbg+WdwotBIk6/MbEhO/dh5aZ5sNj/dWQ==",
                "requires": {
                "mime-db": "1.43.0"
              }
            },
            "mimic-fn": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-1.2.0.tgz",
                "integrity": "sha512-jf84uxzwiuiIVKiOLpfYk7N46TSy8ubTonmneY9vrpHNAnp0QBt2BxWV9dO3/j+BoVAb+a5G6YDPW3M5HOdMWQ=="
            },
            "mini-css-extract-plugin": {
              "version": "0.8.0",
                "resolved": "https://registry.npmjs.org/mini-css-extract-plugin/-/mini-css-extract-plugin-0.8.0.tgz",
                "integrity": "sha512-MNpRGbNA52q6U92i0qbVpQNsgk7LExy41MdAlG84FeytfDOtRIf/mCHdEgG8rpTKOaNKiqUnZdlptF469hxqOw==",
                "requires": {
                "loader-utils": "^1.1.0",
                  "normalize-url": "1.9.1",
                  "schema-utils": "^1.0.0",
                  "webpack-sources": "^1.1.0"
              },
              "dependencies": {
                "schema-utils": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
                    "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
                    "requires": {
                    "ajv": "^6.1.0",
                      "ajv-errors": "^1.0.0",
                      "ajv-keywords": "^3.1.0"
                  }
                }
              }
            },
            "mini-store": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/mini-store/-/mini-store-2.0.0.tgz",
                "integrity": "sha512-EG0CuwpQmX+XL4QVS0kxNwHW5ftSbhygu1qxQH0pipugjnPkbvkalCdQbEihMwtQY6d3MTN+MS0q+aurs+RfLQ==",
                "requires": {
                "hoist-non-react-statics": "^2.3.1",
                  "prop-types": "^15.6.0",
                  "react-lifecycles-compat": "^3.0.4",
                  "shallowequal": "^1.0.2"
              },
              "dependencies": {
                "hoist-non-react-statics": {
                  "version": "2.5.5",
                    "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-2.5.5.tgz",
                    "integrity": "sha512-rqcy4pJo55FTTLWt+bU8ukscqHeE/e9KWvsOW2b/a3afxQZhwkQdT1rPPCJ0rYXdj4vNcasY8zHTH+jF/qStxw=="
                }
              }
            },
            "minimalistic-assert": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
                "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
            },
            "minimalistic-crypto-utils": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
                "integrity": "sha1-9sAMHAsIIkblxNmd+4x8CDsrWCo="
            },
            "minimatch": {
              "version": "3.0.4",
                "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.0.4.tgz",
                "integrity": "sha512-yJHVQEhyqPLUTgt9B83PXu6W3rx4MvvHvSUvToogpwoGDOUQ+yDrR0HRot+yOCdCO7u4hX3pWft6kWBBcqh0UA==",
                "requires": {
                "brace-expansion": "^1.1.7"
              }
            },
            "minimist": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.0.tgz",
                "integrity": "sha1-o1AIsg9BOD7sH7kU9M1d95omQoQ="
            },
            "minipass": {
              "version": "3.1.1",
                "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.1.1.tgz",
                "integrity": "sha512-UFqVihv6PQgwj8/yTGvl9kPz7xIAY+R5z6XYjRInD3Gk3qx6QGSD6zEcpeG4Dy/lQnv1J6zv8ejV90hyYIKf3w==",
                "requires": {
                "yallist": "^4.0.0"
              },
              "dependencies": {
                "yallist": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
                    "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
                }
              }
            },
            "minipass-collect": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/minipass-collect/-/minipass-collect-1.0.2.tgz",
                "integrity": "sha512-6T6lH0H8OG9kITm/Jm6tdooIbogG9e0tLgpY6mphXSm/A9u8Nq1ryBG+Qspiub9LjWlBPsPS3tWQ/Botq4FdxA==",
                "requires": {
                "minipass": "^3.0.0"
              }
            },
            "minipass-flush": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/minipass-flush/-/minipass-flush-1.0.5.tgz",
                "integrity": "sha512-JmQSYYpPUqX5Jyn1mXaRwOda1uQ8HP5KAT/oDSLCzt1BYRhQU0/hDtsB1ufZfEEzMZ9aAVmsBw8+FWsIXlClWw==",
                "requires": {
                "minipass": "^3.0.0"
              }
            },
            "minipass-pipeline": {
              "version": "1.2.2",
                "resolved": "https://registry.npmjs.org/minipass-pipeline/-/minipass-pipeline-1.2.2.tgz",
                "integrity": "sha512-3JS5A2DKhD2g0Gg8x3yamO0pj7YeKGwVlDS90pF++kxptwx/F+B//roxf9SqYil5tQo65bijy+dAuAFZmYOouA==",
                "requires": {
                "minipass": "^3.0.0"
              }
            },
            "mississippi": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/mississippi/-/mississippi-3.0.0.tgz",
                "integrity": "sha512-x471SsVjUtBRtcvd4BzKE9kFC+/2TeWgKCgw0bZcw1b9l2X3QX5vCWgF+KaZaYm87Ss//rHnWryupDrgLvmSkA==",
                "requires": {
                "concat-stream": "^1.5.0",
                  "duplexify": "^3.4.2",
                  "end-of-stream": "^1.1.0",
                  "flush-write-stream": "^1.0.0",
                  "from2": "^2.1.0",
                  "parallel-transform": "^1.1.0",
                  "pump": "^3.0.0",
                  "pumpify": "^1.3.3",
                  "stream-each": "^1.1.0",
                  "through2": "^2.0.0"
              }
            },
            "mixin-deep": {
              "version": "1.3.2",
                "resolved": "https://registry.npmjs.org/mixin-deep/-/mixin-deep-1.3.2.tgz",
                "integrity": "sha512-WRoDn//mXBiJ1H40rqa3vH0toePwSsGb45iInWlTySa+Uu4k3tYUSxa2v1KqAiLtvlrSzaExqS1gtk96A9zvEA==",
                "requires": {
                "for-in": "^1.0.2",
                  "is-extendable": "^1.0.1"
              },
              "dependencies": {
                "is-extendable": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",
                    "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",
                    "requires": {
                    "is-plain-object": "^2.0.4"
                  }
                }
              }
            },
            "mixin-object": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/mixin-object/-/mixin-object-2.0.1.tgz",
                "integrity": "sha1-T7lJRB2rGCVA8f4DW6YOGUel5X4=",
                "requires": {
                "for-in": "^0.1.3",
                  "is-extendable": "^0.1.1"
              },
              "dependencies": {
                "for-in": {
                  "version": "0.1.8",
                    "resolved": "https://registry.npmjs.org/for-in/-/for-in-0.1.8.tgz",
                    "integrity": "sha1-2Hc5COMSVhCZUrH9ubP6hn0ndeE="
                }
              }
            },
            "mkdirp": {
              "version": "0.5.1",
                "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz",
                "integrity": "sha1-MAV0OOrGz3+MR2fzhkjWaX11yQM=",
                "requires": {
                "minimist": "0.0.8"
              },
              "dependencies": {
                "minimist": {
                  "version": "0.0.8",
                    "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz",
                    "integrity": "sha1-hX/Kv8M5fSYluCKCYuhqp6ARsF0="
                }
              }
            },
            "moment": {
              "version": "2.24.0",
                "resolved": "https://registry.npmjs.org/moment/-/moment-2.24.0.tgz",
                "integrity": "sha512-bV7f+6l2QigeBBZSM/6yTNq4P2fNpSWj/0e7jQcy87A8e7o2nAfP/34/2ky5Vw4B9S446EtIhodAzkFCcR4dQg=="
            },
            "move-concurrently": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/move-concurrently/-/move-concurrently-1.0.1.tgz",
                "integrity": "sha1-viwAX9oy4LKa8fBdfEszIUxwH5I=",
                "requires": {
                "aproba": "^1.1.1",
                  "copy-concurrently": "^1.0.0",
                  "fs-write-stream-atomic": "^1.0.8",
                  "mkdirp": "^0.5.1",
                  "rimraf": "^2.5.4",
                  "run-queue": "^1.0.3"
              }
            },
            "ms": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",
                "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg=="
            },
            "multicast-dns": {
              "version": "6.2.3",
                "resolved": "https://registry.npmjs.org/multicast-dns/-/multicast-dns-6.2.3.tgz",
                "integrity": "sha512-ji6J5enbMyGRHIAkAOu3WdV8nggqviKCEKtXcOqfphZZtQrmHKycfynJ2V7eVPUA4NhJ6V7Wf4TmGbTwKE9B6g==",
                "requires": {
                "dns-packet": "^1.3.1",
                  "thunky": "^1.0.2"
              }
            },
            "multicast-dns-service-types": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/multicast-dns-service-types/-/multicast-dns-service-types-1.1.0.tgz",
                "integrity": "sha1-iZ8R2WhuXgXLkbNdXw5jt3PPyQE="
            },
            "mutationobserver-shim": {
              "version": "0.3.3",
                "resolved": "https://registry.npmjs.org/mutationobserver-shim/-/mutationobserver-shim-0.3.3.tgz",
                "integrity": "sha512-gciOLNN8Vsf7YzcqRjKzlAJ6y7e+B86u7i3KXes0xfxx/nfLmozlW1Vn+Sc9x3tPIePFgc1AeIFhtRgkqTjzDQ=="
            },
            "mute-stream": {
              "version": "0.0.7",
                "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.7.tgz",
                "integrity": "sha1-MHXOk7whuPq0PhvE2n6BFe0ee6s="
            },
            "nan": {
              "version": "2.14.0",
                "resolved": "https://registry.npmjs.org/nan/-/nan-2.14.0.tgz",
                "integrity": "sha512-INOFj37C7k3AfaNTtX8RhsTw7qRy7eLET14cROi9+5HAVbbHuIWUHEauBv5qT4Av2tWasiTY1Jw6puUNqRJXQg=="
            },
            "nanomatch": {
              "version": "1.2.13",
                "resolved": "https://registry.npmjs.org/nanomatch/-/nanomatch-1.2.13.tgz",
                "integrity": "sha512-fpoe2T0RbHwBTBUOftAfBPaDEi06ufaUai0mE6Yn1kacc3SnTErfb/h+X94VXzI64rKFHYImXSvdwGGCmwOqCA==",
                "requires": {
                "arr-diff": "^4.0.0",
                  "array-unique": "^0.3.2",
                  "define-property": "^2.0.2",
                  "extend-shallow": "^3.0.2",
                  "fragment-cache": "^0.2.1",
                  "is-windows": "^1.0.2",
                  "kind-of": "^6.0.2",
                  "object.pick": "^1.3.0",
                  "regex-not": "^1.0.0",
                  "snapdragon": "^0.8.1",
                  "to-regex": "^3.0.1"
              },
              "dependencies": {
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "natural-compare": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
                "integrity": "sha1-Sr6/7tdUHywnrPspvbvRXI1bpPc="
            },
            "negotiator": {
              "version": "0.6.2",
                "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.2.tgz",
                "integrity": "sha512-hZXc7K2e+PgeI1eDBe/10Ard4ekbfrrqG8Ep+8Jmf4JID2bNg7NvCPOZN+kfF574pFQI7mum2AUqDidoKqcTOw=="
            },
            "neo-async": {
              "version": "2.6.1",
                "resolved": "https://registry.npmjs.org/neo-async/-/neo-async-2.6.1.tgz",
                "integrity": "sha512-iyam8fBuCUpWeKPGpaNMetEocMt364qkCsfL9JuhjXX6dRnguRVOfk2GZaDpPjcOKiiXCPINZC1GczQ7iTq3Zw=="
            },
            "next-tick": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/next-tick/-/next-tick-1.0.0.tgz",
                "integrity": "sha1-yobR/ogoFpsBICCOPchCS524NCw="
            },
            "nice-try": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/nice-try/-/nice-try-1.0.5.tgz",
                "integrity": "sha512-1nh45deeb5olNY7eX82BkPO7SSxR5SSYJiPTrTdFUVYwAl8CKMA5N9PjTYkHiRjisVcxcQ1HXdLhx2qxxJzLNQ=="
            },
            "no-case": {
              "version": "2.3.2",
                "resolved": "https://registry.npmjs.org/no-case/-/no-case-2.3.2.tgz",
                "integrity": "sha512-rmTZ9kz+f3rCvK2TD1Ue/oZlns7OGoIWP4fc3llxxRXlOkHKoWPPWJOfFYpITabSow43QJbRIoHQXtt10VldyQ==",
                "requires": {
                "lower-case": "^1.1.1"
              }
            },
            "node-fetch": {
              "version": "1.7.3",
                "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-1.7.3.tgz",
                "integrity": "sha512-NhZ4CsKx7cYm2vSrBAr2PvFOe6sWDf0UYLRqA6svUYg7+/TSfVAu49jYC4BvQ4Sms9SZgdqGBgroqfDhJdTyKQ==",
                "requires": {
                "encoding": "^0.1.11",
                  "is-stream": "^1.0.1"
              }
            },
            "node-forge": {
              "version": "0.9.0",
                "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-0.9.0.tgz",
                "integrity": "sha512-7ASaDa3pD+lJ3WvXFsxekJQelBKRpne+GOVbLbtHYdd7pFspyeuJHnWfLplGf3SwKGbfs/aYl5V/JCIaHVUKKQ=="
            },
            "node-gyp": {
              "version": "3.8.0",
                "resolved": "https://registry.npmjs.org/node-gyp/-/node-gyp-3.8.0.tgz",
                "integrity": "sha512-3g8lYefrRRzvGeSowdJKAKyks8oUpLEd/DyPV4eMhVlhJ0aNaZqIrNUIPuEWWTAoPqyFkfGrM67MC69baqn6vA==",
                "requires": {
                "fstream": "^1.0.0",
                  "glob": "^7.0.3",
                  "graceful-fs": "^4.1.2",
                  "mkdirp": "^0.5.0",
                  "nopt": "2 || 3",
                  "npmlog": "0 || 1 || 2 || 3 || 4",
                  "osenv": "0",
                  "request": "^2.87.0",
                  "rimraf": "2",
                  "semver": "~5.3.0",
                  "tar": "^2.0.0",
                  "which": "1"
              },
              "dependencies": {
                "semver": {
                  "version": "5.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-5.3.0.tgz",
                    "integrity": "sha1-myzl094C0XxgEq0yaqa00M9U+U8="
                }
              }
            },
            "node-int64": {
              "version": "0.4.0",
                "resolved": "https://registry.npmjs.org/node-int64/-/node-int64-0.4.0.tgz",
                "integrity": "sha1-h6kGXNs1XTGC2PlM4RGIuCXGijs="
            },
            "node-libs-browser": {
              "version": "2.2.1",
                "resolved": "https://registry.npmjs.org/node-libs-browser/-/node-libs-browser-2.2.1.tgz",
                "integrity": "sha512-h/zcD8H9kaDZ9ALUWwlBUDo6TKF8a7qBSCSEGfjTVIYeqsioSKaAX+BN7NgiMGp6iSIXZ3PxgCu8KS3b71YK5Q==",
                "requires": {
                "assert": "^1.1.1",
                  "browserify-zlib": "^0.2.0",
                  "buffer": "^4.3.0",
                  "console-browserify": "^1.1.0",
                  "constants-browserify": "^1.0.0",
                  "crypto-browserify": "^3.11.0",
                  "domain-browser": "^1.1.1",
                  "events": "^3.0.0",
                  "https-browserify": "^1.0.0",
                  "os-browserify": "^0.3.0",
                  "path-browserify": "0.0.1",
                  "process": "^0.11.10",
                  "punycode": "^1.2.4",
                  "querystring-es3": "^0.2.0",
                  "readable-stream": "^2.3.3",
                  "stream-browserify": "^2.0.1",
                  "stream-http": "^2.7.2",
                  "string_decoder": "^1.0.0",
                  "timers-browserify": "^2.0.4",
                  "tty-browserify": "0.0.0",
                  "url": "^0.11.0",
                  "util": "^0.11.0",
                  "vm-browserify": "^1.0.1"
              },
              "dependencies": {
                "punycode": {
                  "version": "1.4.1",
                    "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
                    "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
                },
                "util": {
                  "version": "0.11.1",
                    "resolved": "https://registry.npmjs.org/util/-/util-0.11.1.tgz",
                    "integrity": "sha512-HShAsny+zS2TZfaXxD9tYj4HQGlBezXZMZuM/S5PKLLoZkShZiGk9o5CzukI1LVHZvjdvZ2Sj1aW/Ndn2NB/HQ==",
                    "requires": {
                    "inherits": "2.0.3"
                  }
                }
              }
            },
            "node-modules-regexp": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/node-modules-regexp/-/node-modules-regexp-1.0.0.tgz",
                "integrity": "sha1-jZ2+KJZKSsVxLpExZCEHxx6Q7EA="
            },
            "node-notifier": {
              "version": "5.4.3",
                "resolved": "https://registry.npmjs.org/node-notifier/-/node-notifier-5.4.3.tgz",
                "integrity": "sha512-M4UBGcs4jeOK9CjTsYwkvH6/MzuUmGCyTW+kCY7uO+1ZVr0+FHGdPdIf5CCLqAaxnRrWidyoQlNkMIIVwbKB8Q==",
                "requires": {
                "growly": "^1.3.0",
                  "is-wsl": "^1.1.0",
                  "semver": "^5.5.0",
                  "shellwords": "^0.1.1",
                  "which": "^1.3.0"
              }
            },
            "node-releases": {
              "version": "1.1.45",
                "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-1.1.45.tgz",
                "integrity": "sha512-cXvGSfhITKI8qsV116u2FTzH5EWZJfgG7d4cpqwF8I8+1tWpD6AsvvGRKq2onR0DNj1jfqsjkXZsm14JMS7Cyg==",
                "requires": {
                "semver": "^6.3.0"
              },
              "dependencies": {
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                }
              }
            },
            "node-sass": {
              "version": "4.12.0",
                "resolved": "https://registry.npmjs.org/node-sass/-/node-sass-4.12.0.tgz",
                "integrity": "sha512-A1Iv4oN+Iel6EPv77/HddXErL2a+gZ4uBeZUy+a8O35CFYTXhgA8MgLCWBtwpGZdCvTvQ9d+bQxX/QC36GDPpQ==",
                "requires": {
                "async-foreach": "^0.1.3",
                  "chalk": "^1.1.1",
                  "cross-spawn": "^3.0.0",
                  "gaze": "^1.0.0",
                  "get-stdin": "^4.0.1",
                  "glob": "^7.0.3",
                  "in-publish": "^2.0.0",
                  "lodash": "^4.17.11",
                  "meow": "^3.7.0",
                  "mkdirp": "^0.5.1",
                  "nan": "^2.13.2",
                  "node-gyp": "^3.8.0",
                  "npmlog": "^4.0.0",
                  "request": "^2.88.0",
                  "sass-graph": "^2.2.4",
                  "stdout-stream": "^1.4.0",
                  "true-case-path": "^1.0.2"
              },
              "dependencies": {
                "ansi-styles": {
                  "version": "2.2.1",
                    "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-2.2.1.tgz",
                    "integrity": "sha1-tDLdM1i2NM914eRmQ2gkBTPB3b4="
                },
                "chalk": {
                  "version": "1.1.3",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-1.1.3.tgz",
                    "integrity": "sha1-qBFcVeSnAv5NFQq9OHKCKn4J/Jg=",
                    "requires": {
                    "ansi-styles": "^2.2.1",
                      "escape-string-regexp": "^1.0.2",
                      "has-ansi": "^2.0.0",
                      "strip-ansi": "^3.0.0",
                      "supports-color": "^2.0.0"
                  }
                },
                "cross-spawn": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-3.0.1.tgz",
                    "integrity": "sha1-ElYDfsufDF9549bvE14wdwGEuYI=",
                    "requires": {
                    "lru-cache": "^4.0.1",
                      "which": "^1.2.9"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                },
                "supports-color": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-2.0.0.tgz",
                    "integrity": "sha1-U10EXOa2Nj+kARcIRimZXp3zJMc="
                }
              }
            },
            "nopt": {
              "version": "3.0.6",
                "resolved": "https://registry.npmjs.org/nopt/-/nopt-3.0.6.tgz",
                "integrity": "sha1-xkZdvwirzU2zWTF/eaxopkayj/k=",
                "requires": {
                "abbrev": "1"
              }
            },
            "normalize-package-data": {
              "version": "2.4.0",
                "resolved": "https://registry.npmjs.org/normalize-package-data/-/normalize-package-data-2.4.0.tgz",
                "integrity": "sha512-9jjUFbTPfEy3R/ad/2oNbKtW9Hgovl5O1FvFWKkKblNXoN/Oou6+9+KKohPK13Yc3/TyunyWhJp6gvRNR/PPAw==",
                "requires": {
                "hosted-git-info": "^2.1.4",
                  "is-builtin-module": "^1.0.0",
                  "semver": "2 || 3 || 4 || 5",
                  "validate-npm-package-license": "^3.0.1"
              }
            },
            "normalize-path": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-2.1.1.tgz",
                "integrity": "sha1-GrKLVW4Zg2Oowab35vogE3/mrtk=",
                "requires": {
                "remove-trailing-separator": "^1.0.1"
              }
            },
            "normalize-range": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
                "integrity": "sha1-LRDAa9/TEuqXd2laTShDlFa3WUI="
            },
            "normalize-url": {
              "version": "1.9.1",
                "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-1.9.1.tgz",
                "integrity": "sha1-LMDWazHqIwNkWENuNiDYWVTGbDw=",
                "requires": {
                "object-assign": "^4.0.1",
                  "prepend-http": "^1.0.0",
                  "query-string": "^4.1.0",
                  "sort-keys": "^1.0.0"
              }
            },
            "npm-run-path": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-2.0.2.tgz",
                "integrity": "sha1-NakjLfo11wZ7TLLd8jV7GHFTbF8=",
                "requires": {
                "path-key": "^2.0.0"
              }
            },
            "npmlog": {
              "version": "4.1.2",
                "resolved": "https://registry.npmjs.org/npmlog/-/npmlog-4.1.2.tgz",
                "integrity": "sha512-2uUqazuKlTaSI/dC8AzicUck7+IrEaOnN/e0jd3Xtt1KcGpwx30v50mL7oPyr/h9bL3E4aZccVwpwP+5W9Vjkg==",
                "requires": {
                "are-we-there-yet": "~1.1.2",
                  "console-control-strings": "~1.1.0",
                  "gauge": "~2.7.3",
                  "set-blocking": "~2.0.0"
              }
            },
            "nth-check": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/nth-check/-/nth-check-1.0.2.tgz",
                "integrity": "sha512-WeBOdju8SnzPN5vTUJYxYUxLeXpCaVP5i5e0LF8fg7WORF2Wd7wFX/pk0tYZk7s8T+J7VLy0Da6J1+wCT0AtHg==",
                "requires": {
                "boolbase": "~1.0.0"
              }
            },
            "num2fraction": {
              "version": "1.2.2",
                "resolved": "https://registry.npmjs.org/num2fraction/-/num2fraction-1.2.2.tgz",
                "integrity": "sha1-b2gragJ6Tp3fpFZM0lidHU5mnt4="
            },
            "number-is-nan": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/number-is-nan/-/number-is-nan-1.0.1.tgz",
                "integrity": "sha1-CXtgK1NCKlIsGvuHkDGDNpQaAR0="
            },
            "nwsapi": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/nwsapi/-/nwsapi-2.2.0.tgz",
                "integrity": "sha512-h2AatdwYH+JHiZpv7pt/gSX1XoRGb7L/qSIeuqA6GwYoF9w1vP1cw42TO0aI2pNyshRK5893hNSl+1//vHK7hQ=="
            },
            "oauth-sign": {
              "version": "0.9.0",
                "resolved": "https://registry.npmjs.org/oauth-sign/-/oauth-sign-0.9.0.tgz",
                "integrity": "sha512-fexhUFFPTGV8ybAtSIGbV6gOkSv8UtRbDBnAyLQw4QPKkgNlsH2ByPGtMUqdWkos6YCRmAqViwgZrJc/mRDzZQ=="
            },
            "object-assign": {
              "version": "4.1.1",
                "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
                "integrity": "sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM="
            },
            "object-copy": {
              "version": "0.1.0",
                "resolved": "https://registry.npmjs.org/object-copy/-/object-copy-0.1.0.tgz",
                "integrity": "sha1-fn2Fi3gb18mRpBupde04EnVOmYw=",
                "requires": {
                "copy-descriptor": "^0.1.0",
                  "define-property": "^0.2.5",
                  "kind-of": "^3.0.3"
              },
              "dependencies": {
                "define-property": {
                  "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                    "is-descriptor": "^0.1.0"
                  }
                }
              }
            },
            "object-hash": {
              "version": "1.3.1",
                "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-1.3.1.tgz",
                "integrity": "sha512-OSuu/pU4ENM9kmREg0BdNrUDIl1heYa4mBZacJc+vVWz4GtAwu7jO8s4AIt2aGRUTqxykpWzI3Oqnsm13tTMDA=="
            },
            "object-inspect": {
              "version": "1.7.0",
                "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.7.0.tgz",
                "integrity": "sha512-a7pEHdh1xKIAgTySUGgLMx/xwDZskN1Ud6egYYN3EdRW4ZMPNEDUTF+hwy2LUC+Bl+SyLXANnwz/jyh/qutKUw=="
            },
            "object-is": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/object-is/-/object-is-1.0.2.tgz",
                "integrity": "sha512-Epah+btZd5wrrfjkJZq1AOB9O6OxUQto45hzFd7lXGrpHPGE0W1k+426yrZV+k6NJOzLNNW/nVsmZdIWsAqoOQ=="
            },
            "object-keys": {
              "version": "1.0.12",
                "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.0.12.tgz",
                "integrity": "sha512-FTMyFUm2wBcGHnH2eXmz7tC6IwlqQZ6mVZ+6dm6vZ4IQIHjs6FdNsQBuKGPuUUUY6NfJw2PshC08Tn6LzLDOag=="
            },
            "object-path": {
              "version": "0.11.4",
                "resolved": "https://registry.npmjs.org/object-path/-/object-path-0.11.4.tgz",
                "integrity": "sha1-NwrnUvvzfePqcKhhwju6iRVpGUk="
            },
            "object-visit": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/object-visit/-/object-visit-1.0.1.tgz",
                "integrity": "sha1-95xEk68MU3e1n+OdOV5BBC3QRbs=",
                "requires": {
                "isobject": "^3.0.0"
              }
            },
            "object.assign": {
              "version": "4.1.0",
                "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.0.tgz",
                "integrity": "sha512-exHJeq6kBKj58mqGyTQ9DFvrZC/eR6OwxzoM9YRoGBqrXYonaFyGiFMuc9VZrXf7DarreEwMpurG3dd+CNyW5w==",
                "requires": {
                "define-properties": "^1.1.2",
                  "function-bind": "^1.1.1",
                  "has-symbols": "^1.0.0",
                  "object-keys": "^1.0.11"
              }
            },
            "object.entries": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.1.tgz",
                "integrity": "sha512-ilqR7BgdyZetJutmDPfXCDffGa0/Yzl2ivVNpbx/g4UeWrCdRnFDUBrKJGLhGieRHDATnyZXWBeCb29k9CJysQ==",
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.17.0-next.1",
                  "function-bind": "^1.1.1",
                  "has": "^1.0.3"
              },
              "dependencies": {
                "es-abstract": {
                  "version": "1.17.0",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.0.tgz",
                    "integrity": "sha512-yYkE07YF+6SIBmg1MsJ9dlub5L48Ek7X0qz+c/CPCHS9EBXfESorzng4cJQjJW5/pB6vDF41u7F8vUhLVDqIug==",
                    "requires": {
                    "es-to-primitive": "^1.2.1",
                      "function-bind": "^1.1.1",
                      "has": "^1.0.3",
                      "has-symbols": "^1.0.1",
                      "is-callable": "^1.1.5",
                      "is-regex": "^1.0.5",
                      "object-inspect": "^1.7.0",
                      "object-keys": "^1.1.1",
                      "object.assign": "^4.1.0",
                      "string.prototype.trimleft": "^2.1.1",
                      "string.prototype.trimright": "^2.1.1"
                  }
                },
                "has-symbols": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
                    "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg=="
                },
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
                }
              }
            },
            "object.fromentries": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.2.tgz",
                "integrity": "sha512-r3ZiBH7MQppDJVLx6fhD618GKNG40CZYH9wgwdhKxBDDbQgjeWGGd4AtkZad84d291YxvWe7bJGuE65Anh0dxQ==",
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.17.0-next.1",
                  "function-bind": "^1.1.1",
                  "has": "^1.0.3"
              },
              "dependencies": {
                "es-abstract": {
                  "version": "1.17.0",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.0.tgz",
                    "integrity": "sha512-yYkE07YF+6SIBmg1MsJ9dlub5L48Ek7X0qz+c/CPCHS9EBXfESorzng4cJQjJW5/pB6vDF41u7F8vUhLVDqIug==",
                    "requires": {
                    "es-to-primitive": "^1.2.1",
                      "function-bind": "^1.1.1",
                      "has": "^1.0.3",
                      "has-symbols": "^1.0.1",
                      "is-callable": "^1.1.5",
                      "is-regex": "^1.0.5",
                      "object-inspect": "^1.7.0",
                      "object-keys": "^1.1.1",
                      "object.assign": "^4.1.0",
                      "string.prototype.trimleft": "^2.1.1",
                      "string.prototype.trimright": "^2.1.1"
                  }
                },
                "has-symbols": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
                    "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg=="
                },
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
                }
              }
            },
            "object.getownpropertydescriptors": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/object.getownpropertydescriptors/-/object.getownpropertydescriptors-2.1.0.tgz",
                "integrity": "sha512-Z53Oah9A3TdLoblT7VKJaTDdXdT+lQO+cNpKVnya5JDe9uLvzu1YyY1yFDFrcxrlRgWrEFH0jJtD/IbuwjcEVg==",
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.17.0-next.1"
              },
              "dependencies": {
                "es-abstract": {
                  "version": "1.17.0",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.0.tgz",
                    "integrity": "sha512-yYkE07YF+6SIBmg1MsJ9dlub5L48Ek7X0qz+c/CPCHS9EBXfESorzng4cJQjJW5/pB6vDF41u7F8vUhLVDqIug==",
                    "requires": {
                    "es-to-primitive": "^1.2.1",
                      "function-bind": "^1.1.1",
                      "has": "^1.0.3",
                      "has-symbols": "^1.0.1",
                      "is-callable": "^1.1.5",
                      "is-regex": "^1.0.5",
                      "object-inspect": "^1.7.0",
                      "object-keys": "^1.1.1",
                      "object.assign": "^4.1.0",
                      "string.prototype.trimleft": "^2.1.1",
                      "string.prototype.trimright": "^2.1.1"
                  }
                },
                "has-symbols": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
                    "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg=="
                },
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
                }
              }
            },
            "object.omit": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/object.omit/-/object.omit-2.0.1.tgz",
                "integrity": "sha1-Gpx0SCnznbuFjHbKNXmuKlTr0fo=",
                "dev": true,
                "optional": true,
                "requires": {
                "for-own": "^0.1.4",
                  "is-extendable": "^0.1.1"
              }
            },
            "object.pick": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",
                "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",
                "requires": {
                "isobject": "^3.0.1"
              }
            },
            "object.values": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.1.0.tgz",
                "integrity": "sha512-8mf0nKLAoFX6VlNVdhGj31SVYpaNFtUnuoOXWyFEstsWRgU837AK+JYM0iAxwkSzGRbwn8cbFmgbyxj1j4VbXg==",
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.12.0",
                  "function-bind": "^1.1.1",
                  "has": "^1.0.3"
              }
            },
            "obuf": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/obuf/-/obuf-1.1.2.tgz",
                "integrity": "sha512-PX1wu0AmAdPqOL1mWhqmlOd8kOIZQwGZw6rh7uby9fTc5lhaOWFLX3I6R1hrF9k3zUY40e6igsLGkDXK92LJNg=="
            },
            "omit.js": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/omit.js/-/omit.js-1.0.2.tgz",
                "integrity": "sha512-/QPc6G2NS+8d4L/cQhbk6Yit1WTB6Us2g84A7A/1+w9d/eRGHyEqC5kkQtHVoHZ5NFWGG7tUGgrhVZwgZanKrQ==",
                "requires": {
                "babel-runtime": "^6.23.0"
              }
            },
            "on-finished": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",
                "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",
                "requires": {
                "ee-first": "1.1.1"
              }
            },
            "on-headers": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/on-headers/-/on-headers-1.0.2.tgz",
                "integrity": "sha512-pZAE+FJLoyITytdqK0U5s+FIpjN0JP3OzFi/u8Rx+EV5/W+JTWGXG8xFzevE7AjBfDqHv/8vL8qQsIhHnqRkrA=="
            },
            "once": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
                "integrity": "sha1-WDsap3WWHUsROsF9nFC6753Xa9E=",
                "requires": {
                "wrappy": "1"
              }
            },
            "onetime": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/onetime/-/onetime-2.0.1.tgz",
                "integrity": "sha1-BnQoIw/WdEOyeUsiu6UotoZ5YtQ=",
                "requires": {
                "mimic-fn": "^1.0.0"
              }
            },
            "open": {
              "version": "7.0.0",
                "resolved": "https://registry.npmjs.org/open/-/open-7.0.0.tgz",
                "integrity": "sha512-K6EKzYqnwQzk+/dzJAQSBORub3xlBTxMz+ntpZpH/LyCa1o6KjXhuN+2npAaI9jaSmU3R1Q8NWf4KUWcyytGsQ==",
                "requires": {
                "is-wsl": "^2.1.0"
              },
              "dependencies": {
                "is-wsl": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-2.1.1.tgz",
                    "integrity": "sha512-umZHcSrwlDHo2TGMXv0DZ8dIUGunZ2Iv68YZnrmCiBPkZ4aaOhtv7pXJKeki9k3qJ3RJr0cDyitcl5wEH3AYog=="
                }
              }
            },
            "opn": {
              "version": "5.5.0",
                "resolved": "https://registry.npmjs.org/opn/-/opn-5.5.0.tgz",
                "integrity": "sha512-PqHpggC9bLV0VeWcdKhkpxY+3JTzetLSqTCWL/z/tFIbI6G8JCjondXklT1JinczLz2Xib62sSp0T/gKT4KksA==",
                "requires": {
                "is-wsl": "^1.1.0"
              }
            },
            "optimist": {
              "version": "0.6.1",
                "resolved": "https://registry.npmjs.org/optimist/-/optimist-0.6.1.tgz",
                "integrity": "sha1-2j6nRob6IaGaERwybpDrFaAZZoY=",
                "requires": {
                "minimist": "~0.0.1",
                  "wordwrap": "~0.0.2"
              },
              "dependencies": {
                "minimist": {
                  "version": "0.0.10",
                    "resolved": "https://registry.npmjs.org/minimist/-/minimist-0.0.10.tgz",
                    "integrity": "sha1-3j+YVD2/lggr5IrRoMfNqDYwHc8="
                },
                "wordwrap": {
                  "version": "0.0.3",
                    "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-0.0.3.tgz",
                    "integrity": "sha1-o9XabNXAvAAI03I0u68b7WMFkQc="
                }
              }
            },
            "optimize-css-assets-webpack-plugin": {
              "version": "5.0.3",
                "resolved": "https://registry.npmjs.org/optimize-css-assets-webpack-plugin/-/optimize-css-assets-webpack-plugin-5.0.3.tgz",
                "integrity": "sha512-q9fbvCRS6EYtUKKSwI87qm2IxlyJK5b4dygW1rKUBT6mMDhdG5e5bZT63v6tnJR9F9FB/H5a0HTmtw+laUBxKA==",
                "requires": {
                "cssnano": "^4.1.10",
                  "last-call-webpack-plugin": "^3.0.0"
              }
            },
            "optionator": {
              "version": "0.8.2",
                "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.2.tgz",
                "integrity": "sha1-NkxeQJ0/TWMB1sC0wFu6UBgK62Q=",
                "requires": {
                "deep-is": "~0.1.3",
                  "fast-levenshtein": "~2.0.4",
                  "levn": "~0.3.0",
                  "prelude-ls": "~1.1.2",
                  "type-check": "~0.3.2",
                  "wordwrap": "~1.0.0"
              }
            },
            "original": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/original/-/original-1.0.2.tgz",
                "integrity": "sha512-hyBVl6iqqUOJ8FqRe+l/gS8H+kKYjrEndd5Pm1MfBtsEKA038HkkdbAl/72EAXGyonD/PFsvmVG+EvcIpliMBg==",
                "requires": {
                "url-parse": "^1.4.3"
              }
            },
            "os-browserify": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/os-browserify/-/os-browserify-0.3.0.tgz",
                "integrity": "sha1-hUNzx/XCMVkU/Jv8a9gjj92h7Cc="
            },
            "os-homedir": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/os-homedir/-/os-homedir-1.0.2.tgz",
                "integrity": "sha1-/7xJiDNuDoM94MFox+8VISGqf7M="
            },
            "os-locale": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-1.4.0.tgz",
                "integrity": "sha1-IPnxeuKe00XoveWDsT0gCYA8FNk=",
                "requires": {
                "lcid": "^1.0.0"
              }
            },
            "os-tmpdir": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz",
                "integrity": "sha1-u+Z0BseaqFxc/sdm/lc0VV36EnQ="
            },
            "osenv": {
              "version": "0.1.5",
                "resolved": "https://registry.npmjs.org/osenv/-/osenv-0.1.5.tgz",
                "integrity": "sha512-0CWcCECdMVc2Rw3U5w9ZjqX6ga6ubk1xDVKxtBQPK7wis/0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g==",
                "requires": {
                "os-homedir": "^1.0.0",
                  "os-tmpdir": "^1.0.0"
              }
            },
            "output-file-sync": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/output-file-sync/-/output-file-sync-1.1.2.tgz",
                "integrity": "sha1-0KM+7+YaIF+suQCS6CZZjVJFznY=",
                "dev": true,
                "requires": {
                "graceful-fs": "^4.1.4",
                  "mkdirp": "^0.5.1",
                  "object-assign": "^4.1.0"
              }
            },
            "p-defer": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/p-defer/-/p-defer-1.0.0.tgz",
                "integrity": "sha1-n26xgvbJqozXQwBKfU+WsZaw+ww="
            },
            "p-each-series": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/p-each-series/-/p-each-series-1.0.0.tgz",
                "integrity": "sha1-kw89Et0fUOdDRFeiLNbwSsatf3E=",
                "requires": {
                "p-reduce": "^1.0.0"
              }
            },
            "p-finally": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/p-finally/-/p-finally-1.0.0.tgz",
                "integrity": "sha1-P7z7FbiZpEEjs0ttzBi3JDNqLK4="
            },
            "p-is-promise": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/p-is-promise/-/p-is-promise-2.1.0.tgz",
                "integrity": "sha512-Y3W0wlRPK8ZMRbNq97l4M5otioeA5lm1z7bkNkxCka8HSPjR0xRWmpCmc9utiaLP9Jb1eD8BgeIxTW4AIF45Pg=="
            },
            "p-limit": {
              "version": "2.2.2",
                "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.2.2.tgz",
                "integrity": "sha512-WGR+xHecKTr7EbUEhyLSh5Dube9JtdiG78ufaeLxTgpudf/20KqyMioIUZJAezlTIi6evxuoUs9YXc11cU+yzQ==",
                "requires": {
                "p-try": "^2.0.0"
              }
            },
            "p-locate": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
                "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
                "requires": {
                "p-limit": "^2.0.0"
              }
            },
            "p-map": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/p-map/-/p-map-3.0.0.tgz",
                "integrity": "sha512-d3qXVTF/s+W+CdJ5A29wywV2n8CQQYahlgz2bFiA+4eVNJbHJodPZ+/gXwPGh0bOqA+j8S+6+ckmvLGPk1QpxQ==",
                "requires": {
                "aggregate-error": "^3.0.0"
              }
            },
            "p-reduce": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/p-reduce/-/p-reduce-1.0.0.tgz",
                "integrity": "sha1-GMKw3ZNqRpClKfgjH1ig/bakffo="
            },
            "p-retry": {
              "version": "3.0.1",
                "resolved": "https://registry.npmjs.org/p-retry/-/p-retry-3.0.1.tgz",
                "integrity": "sha512-XE6G4+YTTkT2a0UWb2kjZe8xNwf8bIbnqpc/IS/idOBVhyves0mK5OJgeocjx7q5pvX/6m23xuzVPYT1uGM73w==",
                "requires": {
                "retry": "^0.12.0"
              }
            },
            "p-try": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
                "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
            },
            "pako": {
              "version": "1.0.10",
                "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.10.tgz",
                "integrity": "sha512-0DTvPVU3ed8+HNXOu5Bs+o//Mbdj9VNQMUOe9oKCwh8l0GNwpTDMKCWbRjgtD291AWnkAgkqA/LOnQS8AmS1tw=="
            },
            "parallel-transform": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/parallel-transform/-/parallel-transform-1.2.0.tgz",
                "integrity": "sha512-P2vSmIu38uIlvdcU7fDkyrxj33gTUy/ABO5ZUbGowxNCopBq/OoD42bP4UmMrJoPyk4Uqf0mu3mtWBhHCZD8yg==",
                "requires": {
                "cyclist": "^1.0.1",
                  "inherits": "^2.0.3",
                  "readable-stream": "^2.1.5"
              }
            },
            "param-case": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/param-case/-/param-case-2.1.1.tgz",
                "integrity": "sha1-35T9jPZTHs915r75oIWPvHK+Ikc=",
                "requires": {
                "no-case": "^2.2.0"
              }
            },
            "parent-module": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
                "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
                "requires": {
                "callsites": "^3.0.0"
              }
            },
            "parse-asn1": {
              "version": "5.1.5",
                "resolved": "https://registry.npmjs.org/parse-asn1/-/parse-asn1-5.1.5.tgz",
                "integrity": "sha512-jkMYn1dcJqF6d5CpU689bq7w/b5ALS9ROVSpQDPrZsqqesUJii9qutvoT5ltGedNXMO2e16YUWIghG9KxaViTQ==",
                "requires": {
                "asn1.js": "^4.0.0",
                  "browserify-aes": "^1.0.0",
                  "create-hash": "^1.1.0",
                  "evp_bytestokey": "^1.0.0",
                  "pbkdf2": "^3.0.3",
                  "safe-buffer": "^5.1.1"
              }
            },
            "parse-glob": {
              "version": "3.0.4",
                "resolved": "https://registry.npmjs.org/parse-glob/-/parse-glob-3.0.4.tgz",
                "integrity": "sha1-ssN2z7EfNVE7rdFz7wu246OIORw=",
                "dev": true,
                "optional": true,
                "requires": {
                "glob-base": "^0.3.0",
                  "is-dotfile": "^1.0.0",
                  "is-extglob": "^1.0.0",
                  "is-glob": "^2.0.0"
              }
            },
            "parse-json": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-4.0.0.tgz",
                "integrity": "sha1-vjX1Qlvh9/bHRxhPmKeIy5lHfuA=",
                "requires": {
                "error-ex": "^1.3.1",
                  "json-parse-better-errors": "^1.0.1"
              }
            },
            "parse5": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",
                "integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA=="
            },
            "parseurl": {
              "version": "1.3.3",
                "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
                "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="
            },
            "pascalcase": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/pascalcase/-/pascalcase-0.1.1.tgz",
                "integrity": "sha1-s2PlXoAGym/iF4TS2yK9FdeRfxQ="
            },
            "path-browserify": {
              "version": "0.0.1",
                "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-0.0.1.tgz",
                "integrity": "sha512-BapA40NHICOS+USX9SN4tyhq+A2RrN/Ws5F0Z5aMHDp98Fl86lX8Oti8B7uN93L4Ifv4fHOEA+pQw87gmMO/lQ=="
            },
            "path-dirname": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/path-dirname/-/path-dirname-1.0.2.tgz",
                "integrity": "sha1-zDPSTVJeCZpTiMAzbG4yuRYGCeA="
            },
            "path-exists": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",
                "integrity": "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU="
            },
            "path-is-absolute": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
                "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18="
            },
            "path-is-inside": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/path-is-inside/-/path-is-inside-1.0.2.tgz",
                "integrity": "sha1-NlQX3t5EQw0cEa9hAn+s8HS9/FM="
            },
            "path-key": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/path-key/-/path-key-2.0.1.tgz",
                "integrity": "sha1-QRyttXTFoUDTpLGRDUDYDMn0C0A="
            },
            "path-parse": {
              "version": "1.0.6",
                "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.6.tgz",
                "integrity": "sha512-GSmOT2EbHrINBf9SR7CDELwlJ8AENk3Qn7OikK4nFYAu3Ote2+JYNVvkpAEQm3/TLNEJFD/xZJjzyxg3KBWOzw=="
            },
            "path-to-regexp": {
              "version": "1.8.0",
                "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-1.8.0.tgz",
                "integrity": "sha512-n43JRhlUKUAlibEJhPeir1ncUID16QnEjNpwzNdO3Lm4ywrBpBZ5oLD0I6br9evr1Y9JTqwRtAh7JLoOzAQdVA==",
                "requires": {
                "isarray": "0.0.1"
              },
              "dependencies": {
                "isarray": {
                  "version": "0.0.1",
                    "resolved": "https://registry.npmjs.org/isarray/-/isarray-0.0.1.tgz",
                    "integrity": "sha1-ihis/Kmo9Bd+Cav8YDiTmwXR7t8="
                }
              }
            },
            "path-type": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/path-type/-/path-type-1.1.0.tgz",
                "integrity": "sha1-WcRPfuSR2nBNpBXaWkBwuk+P5EE=",
                "requires": {
                "graceful-fs": "^4.1.2",
                  "pify": "^2.0.0",
                  "pinkie-promise": "^2.0.0"
              }
            },
            "pbkdf2": {
              "version": "3.0.17",
                "resolved": "https://registry.npmjs.org/pbkdf2/-/pbkdf2-3.0.17.tgz",
                "integrity": "sha512-U/il5MsrZp7mGg3mSQfn742na2T+1/vHDCG5/iTI3X9MKUuYUZVLQhyRsg06mCgDBTd57TxzgZt7P+fYfjRLtA==",
                "requires": {
                "create-hash": "^1.1.2",
                  "create-hmac": "^1.1.4",
                  "ripemd160": "^2.0.1",
                  "safe-buffer": "^5.0.1",
                  "sha.js": "^2.4.8"
              }
            },
            "performance-now": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
                "integrity": "sha1-Ywn04OX6kT7BxpMHrjZLSzd8nns="
            },
            "pify": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                "integrity": "sha1-7RQaasBDqEnqWISY59yosVMw6Qw="
            },
            "pinkie": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/pinkie/-/pinkie-2.0.4.tgz",
                "integrity": "sha1-clVrgM+g1IqXToDnckjoDtT3+HA="
            },
            "pinkie-promise": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/pinkie-promise/-/pinkie-promise-2.0.1.tgz",
                "integrity": "sha1-ITXW36ejWMBprJsXh3YogihFD/o=",
                "requires": {
                "pinkie": "^2.0.0"
              }
            },
            "pirates": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.1.tgz",
                "integrity": "sha512-WuNqLTbMI3tmfef2TKxlQmAiLHKtFhlsCZnPIpuv2Ow0RDVO8lfy1Opf4NUzlMXLjPl+Men7AuVdX6TA+s+uGA==",
                "requires": {
                "node-modules-regexp": "^1.0.0"
              }
            },
            "pkg-conf": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/pkg-conf/-/pkg-conf-2.1.0.tgz",
                "integrity": "sha1-ISZRTKbyq/69FoWW3xi6V4Z/AFg=",
                "dev": true,
                "requires": {
                "find-up": "^2.0.0",
                  "load-json-file": "^4.0.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "dev": true,
                    "requires": {
                    "locate-path": "^2.0.0"
                  }
                },
                "locate-path": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "dev": true,
                    "requires": {
                    "p-locate": "^2.0.0",
                      "path-exists": "^3.0.0"
                  }
                },
                "p-limit": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "dev": true,
                    "requires": {
                    "p-try": "^1.0.0"
                  }
                },
                "p-locate": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "dev": true,
                    "requires": {
                    "p-limit": "^1.1.0"
                  }
                },
                "p-try": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M=",
                    "dev": true
                }
              }
            },
            "pkg-config": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/pkg-config/-/pkg-config-1.1.1.tgz",
                "integrity": "sha1-VX7yLXPaPIg3EHdmxS6tq94pj+Q=",
                "dev": true,
                "requires": {
                "debug-log": "^1.0.0",
                  "find-root": "^1.0.0",
                  "xtend": "^4.0.1"
              }
            },
            "pkg-dir": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
                "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
                "requires": {
                "find-up": "^3.0.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                }
              }
            },
            "pkg-up": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/pkg-up/-/pkg-up-2.0.0.tgz",
                "integrity": "sha1-yBmscoBZpGHKscOImivjxJoATX8=",
                "requires": {
                "find-up": "^2.1.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "requires": {
                    "locate-path": "^2.0.0"
                  }
                },
                "locate-path": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "requires": {
                    "p-locate": "^2.0.0",
                      "path-exists": "^3.0.0"
                  }
                },
                "p-limit": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "requires": {
                    "p-try": "^1.0.0"
                  }
                },
                "p-locate": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "requires": {
                    "p-limit": "^1.1.0"
                  }
                },
                "p-try": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M="
                }
              }
            },
            "pluralize": {
              "version": "7.0.0",
                "resolved": "https://registry.npmjs.org/pluralize/-/pluralize-7.0.0.tgz",
                "integrity": "sha512-ARhBOdzS3e41FbkW/XWrTEtukqqLoK5+Z/4UeDaLuSW+39JPeFgs4gCGqsrJHVZX0fUrx//4OF0K1CUGwlIFow==",
                "dev": true
            },
            "pn": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/pn/-/pn-1.1.0.tgz",
                "integrity": "sha512-2qHaIQr2VLRFoxe2nASzsV6ef4yOOH+Fi9FBOVH6cqeSgUnoyySPZkxzLuzd+RYOQTRpROA0ztTMqxROKSb/nA=="
            },
            "pnp-webpack-plugin": {
              "version": "1.5.0",
                "resolved": "https://registry.npmjs.org/pnp-webpack-plugin/-/pnp-webpack-plugin-1.5.0.tgz",
                "integrity": "sha512-jd9olUr9D7do+RN8Wspzhpxhgp1n6Vd0NtQ4SFkmIACZoEL1nkyAdW9Ygrinjec0vgDcWjscFQQ1gDW8rsfKTg==",
                "requires": {
                "ts-pnp": "^1.1.2"
              }
            },
            "polished": {
              "version": "3.4.1",
                "resolved": "https://registry.npmjs.org/polished/-/polished-3.4.1.tgz",
                "integrity": "sha512-GflTnlP5rrpDoigjczEkS6Ye7NDA4sFvAnlr5hSDrEvjiVj97Xzev3hZlLi3UB27fpxyTS9rWU64VzVLWkG+mg==",
                "requires": {
                "@babel/runtime": "^7.4.5"
              }
            },
            "portfinder": {
              "version": "1.0.25",
                "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.25.tgz",
                "integrity": "sha512-6ElJnHBbxVA1XSLgBp7G1FiCkQdlqGzuF7DswL5tcea+E8UpuvPU7beVAjjRwCioTS9ZluNbu+ZyRvgTsmqEBg==",
                "requires": {
                "async": "^2.6.2",
                  "debug": "^3.1.1",
                  "mkdirp": "^0.5.1"
              },
              "dependencies": {
                "debug": {
                  "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                }
              }
            },
            "posix-character-classes": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/posix-character-classes/-/posix-character-classes-0.1.1.tgz",
                "integrity": "sha1-AerA/jta9xoqbAL+q7jB/vfgDqs="
            },
            "postcss": {
              "version": "7.0.26",
                "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.26.tgz",
                "integrity": "sha512-IY4oRjpXWYshuTDFxMVkJDtWIk2LhsTlu8bZnbEJA4+bYT16Lvpo8Qv6EvDumhYRgzjZl489pmsY3qVgJQ08nA==",
                "requires": {
                "chalk": "^2.4.2",
                  "source-map": "^0.6.1",
                  "supports-color": "^6.1.0"
              },
              "dependencies": {
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  },
                  "dependencies": {
                    "supports-color": {
                      "version": "5.5.0",
                        "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
                        "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
                        "requires": {
                        "has-flag": "^3.0.0"
                      }
                    }
                  }
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                },
                "supports-color": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
                    "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
                    "requires": {
                    "has-flag": "^3.0.0"
                  }
                }
              }
            },
            "postcss-attribute-case-insensitive": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-attribute-case-insensitive/-/postcss-attribute-case-insensitive-4.0.1.tgz",
                "integrity": "sha512-L2YKB3vF4PetdTIthQVeT+7YiSzMoNMLLYxPXXppOOP7NoazEAy45sh2LvJ8leCQjfBcfkYQs8TtCcQjeZTp8A==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-selector-parser": "^5.0.0"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-browser-comments": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-browser-comments/-/postcss-browser-comments-3.0.0.tgz",
                "integrity": "sha512-qfVjLfq7HFd2e0HW4s1dvU8X080OZdG46fFbIBFjW7US7YPDcWfRvdElvwMJr2LI6hMmD+7LnH2HcmXTs+uOig==",
                "requires": {
                "postcss": "^7"
              }
            },
            "postcss-calc": {
              "version": "7.0.1",
                "resolved": "https://registry.npmjs.org/postcss-calc/-/postcss-calc-7.0.1.tgz",
                "integrity": "sha512-oXqx0m6tb4N3JGdmeMSc/i91KppbYsFZKdH0xMOqK8V1rJlzrKlTdokz8ozUXLVejydRN6u2IddxpcijRj2FqQ==",
                "requires": {
                "css-unit-converter": "^1.1.1",
                  "postcss": "^7.0.5",
                  "postcss-selector-parser": "^5.0.0-rc.4",
                  "postcss-value-parser": "^3.3.1"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                },
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-color-functional-notation": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/postcss-color-functional-notation/-/postcss-color-functional-notation-2.0.1.tgz",
                "integrity": "sha512-ZBARCypjEDofW4P6IdPVTLhDNXPRn8T2s1zHbZidW6rPaaZvcnCS2soYFIQJrMZSxiePJ2XIYTlcb2ztr/eT2g==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-color-gray": {
              "version": "5.0.0",
                "resolved": "https://registry.npmjs.org/postcss-color-gray/-/postcss-color-gray-5.0.0.tgz",
                "integrity": "sha512-q6BuRnAGKM/ZRpfDascZlIZPjvwsRye7UDNalqVz3s7GDxMtqPY6+Q871liNxsonUw8oC61OG+PSaysYpl1bnw==",
                "requires": {
                "@csstools/convert-colors": "^1.4.0",
                  "postcss": "^7.0.5",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-color-hex-alpha": {
              "version": "5.0.3",
                "resolved": "https://registry.npmjs.org/postcss-color-hex-alpha/-/postcss-color-hex-alpha-5.0.3.tgz",
                "integrity": "sha512-PF4GDel8q3kkreVXKLAGNpHKilXsZ6xuu+mOQMHWHLPNyjiUBOr75sp5ZKJfmv1MCus5/DWUGcK9hm6qHEnXYw==",
                "requires": {
                "postcss": "^7.0.14",
                  "postcss-values-parser": "^2.0.1"
              }
            },
            "postcss-color-mod-function": {
              "version": "3.0.3",
                "resolved": "https://registry.npmjs.org/postcss-color-mod-function/-/postcss-color-mod-function-3.0.3.tgz",
                "integrity": "sha512-YP4VG+xufxaVtzV6ZmhEtc+/aTXH3d0JLpnYfxqTvwZPbJhWqp8bSY3nfNzNRFLgB4XSaBA82OE4VjOOKpCdVQ==",
                "requires": {
                "@csstools/convert-colors": "^1.4.0",
                  "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-color-rebeccapurple": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-color-rebeccapurple/-/postcss-color-rebeccapurple-4.0.1.tgz",
                "integrity": "sha512-aAe3OhkS6qJXBbqzvZth2Au4V3KieR5sRQ4ptb2b2O8wgvB3SJBsdG+jsn2BZbbwekDG8nTfcCNKcSfe/lEy8g==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-colormin": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/postcss-colormin/-/postcss-colormin-4.0.3.tgz",
                "integrity": "sha512-WyQFAdDZpExQh32j0U0feWisZ0dmOtPl44qYmJKkq9xFWY3p+4qnRzCHeNrkeRhwPHz9bQ3mo0/yVkaply0MNw==",
                "requires": {
                "browserslist": "^4.0.0",
                  "color": "^3.0.0",
                  "has": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-convert-values": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-convert-values/-/postcss-convert-values-4.0.1.tgz",
                "integrity": "sha512-Kisdo1y77KUC0Jmn0OXU/COOJbzM8cImvw1ZFsBgBgMgb1iL23Zs/LXRe3r+EZqM3vGYKdQ2YJVQ5VkJI+zEJQ==",
                "requires": {
                "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-custom-media": {
              "version": "7.0.8",
                "resolved": "https://registry.npmjs.org/postcss-custom-media/-/postcss-custom-media-7.0.8.tgz",
                "integrity": "sha512-c9s5iX0Ge15o00HKbuRuTqNndsJUbaXdiNsksnVH8H4gdc+zbLzr/UasOwNG6CTDpLFekVY4672eWdiiWu2GUg==",
                "requires": {
                "postcss": "^7.0.14"
              }
            },
            "postcss-custom-properties": {
              "version": "8.0.11",
                "resolved": "https://registry.npmjs.org/postcss-custom-properties/-/postcss-custom-properties-8.0.11.tgz",
                "integrity": "sha512-nm+o0eLdYqdnJ5abAJeXp4CEU1c1k+eB2yMCvhgzsds/e0umabFrN6HoTy/8Q4K5ilxERdl/JD1LO5ANoYBeMA==",
                "requires": {
                "postcss": "^7.0.17",
                  "postcss-values-parser": "^2.0.1"
              }
            },
            "postcss-custom-selectors": {
              "version": "5.1.2",
                "resolved": "https://registry.npmjs.org/postcss-custom-selectors/-/postcss-custom-selectors-5.1.2.tgz",
                "integrity": "sha512-DSGDhqinCqXqlS4R7KGxL1OSycd1lydugJ1ky4iRXPHdBRiozyMHrdu0H3o7qNOCiZwySZTUI5MV0T8QhCLu+w==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-selector-parser": "^5.0.0-rc.3"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-dir-pseudo-class": {
              "version": "5.0.0",
                "resolved": "https://registry.npmjs.org/postcss-dir-pseudo-class/-/postcss-dir-pseudo-class-5.0.0.tgz",
                "integrity": "sha512-3pm4oq8HYWMZePJY+5ANriPs3P07q+LW6FAdTlkFH2XqDdP4HeeJYMOzn0HYLhRSjBO3fhiqSwwU9xEULSrPgw==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-selector-parser": "^5.0.0-rc.3"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-discard-comments": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-discard-comments/-/postcss-discard-comments-4.0.2.tgz",
                "integrity": "sha512-RJutN259iuRf3IW7GZyLM5Sw4GLTOH8FmsXBnv8Ab/Tc2k4SR4qbV4DNbyyY4+Sjo362SyDmW2DQ7lBSChrpkg==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-discard-duplicates": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-discard-duplicates/-/postcss-discard-duplicates-4.0.2.tgz",
                "integrity": "sha512-ZNQfR1gPNAiXZhgENFfEglF93pciw0WxMkJeVmw8eF+JZBbMD7jp6C67GqJAXVZP2BWbOztKfbsdmMp/k8c6oQ==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-discard-empty": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-discard-empty/-/postcss-discard-empty-4.0.1.tgz",
                "integrity": "sha512-B9miTzbznhDjTfjvipfHoqbWKwd0Mj+/fL5s1QOz06wufguil+Xheo4XpOnc4NqKYBCNqqEzgPv2aPBIJLox0w==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-discard-overridden": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-discard-overridden/-/postcss-discard-overridden-4.0.1.tgz",
                "integrity": "sha512-IYY2bEDD7g1XM1IDEsUT4//iEYCxAmP5oDSFMVU/JVvT7gh+l4fmjciLqGgwjdWpQIdb0Che2VX00QObS5+cTg==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-double-position-gradients": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/postcss-double-position-gradients/-/postcss-double-position-gradients-1.0.0.tgz",
                "integrity": "sha512-G+nV8EnQq25fOI8CH/B6krEohGWnF5+3A6H/+JEpOncu5dCnkS1QQ6+ct3Jkaepw1NGVqqOZH6lqrm244mCftA==",
                "requires": {
                "postcss": "^7.0.5",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-env-function": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/postcss-env-function/-/postcss-env-function-2.0.2.tgz",
                "integrity": "sha512-rwac4BuZlITeUbiBq60h/xbLzXY43qOsIErngWa4l7Mt+RaSkT7QBjXVGTcBHupykkblHMDrBFh30zchYPaOUw==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-flexbugs-fixes": {
              "version": "4.1.0",
                "resolved": "https://registry.npmjs.org/postcss-flexbugs-fixes/-/postcss-flexbugs-fixes-4.1.0.tgz",
                "integrity": "sha512-jr1LHxQvStNNAHlgco6PzY308zvLklh7SJVYuWUwyUQncofaAlD2l+P/gxKHOdqWKe7xJSkVLFF/2Tp+JqMSZA==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-focus-visible": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/postcss-focus-visible/-/postcss-focus-visible-4.0.0.tgz",
                "integrity": "sha512-Z5CkWBw0+idJHSV6+Bgf2peDOFf/x4o+vX/pwcNYrWpXFrSfTkQ3JQ1ojrq9yS+upnAlNRHeg8uEwFTgorjI8g==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-focus-within": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-focus-within/-/postcss-focus-within-3.0.0.tgz",
                "integrity": "sha512-W0APui8jQeBKbCGZudW37EeMCjDeVxKgiYfIIEo8Bdh5SpB9sxds/Iq8SEuzS0Q4YFOlG7EPFulbbxujpkrV2w==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-font-variant": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/postcss-font-variant/-/postcss-font-variant-4.0.0.tgz",
                "integrity": "sha512-M8BFYKOvCrI2aITzDad7kWuXXTm0YhGdP9Q8HanmN4EF1Hmcgs1KK5rSHylt/lUJe8yLxiSwWAHdScoEiIxztg==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-gap-properties": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/postcss-gap-properties/-/postcss-gap-properties-2.0.0.tgz",
                "integrity": "sha512-QZSqDaMgXCHuHTEzMsS2KfVDOq7ZFiknSpkrPJY6jmxbugUPTuSzs/vuE5I3zv0WAS+3vhrlqhijiprnuQfzmg==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-image-set-function": {
              "version": "3.0.1",
                "resolved": "https://registry.npmjs.org/postcss-image-set-function/-/postcss-image-set-function-3.0.1.tgz",
                "integrity": "sha512-oPTcFFip5LZy8Y/whto91L9xdRHCWEMs3e1MdJxhgt4jy2WYXfhkng59fH5qLXSCPN8k4n94p1Czrfe5IOkKUw==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-initial": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/postcss-initial/-/postcss-initial-3.0.2.tgz",
                "integrity": "sha512-ugA2wKonC0xeNHgirR4D3VWHs2JcU08WAi1KFLVcnb7IN89phID6Qtg2RIctWbnvp1TM2BOmDtX8GGLCKdR8YA==",
                "requires": {
                "lodash.template": "^4.5.0",
                  "postcss": "^7.0.2"
              }
            },
            "postcss-lab-function": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/postcss-lab-function/-/postcss-lab-function-2.0.1.tgz",
                "integrity": "sha512-whLy1IeZKY+3fYdqQFuDBf8Auw+qFuVnChWjmxm/UhHWqNHZx+B99EwxTvGYmUBqe3Fjxs4L1BoZTJmPu6usVg==",
                "requires": {
                "@csstools/convert-colors": "^1.4.0",
                  "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-load-config": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-2.1.0.tgz",
                "integrity": "sha512-4pV3JJVPLd5+RueiVVB+gFOAa7GWc25XQcMp86Zexzke69mKf6Nx9LRcQywdz7yZI9n1udOxmLuAwTBypypF8Q==",
                "requires": {
                "cosmiconfig": "^5.0.0",
                  "import-cwd": "^2.0.0"
              }
            },
            "postcss-loader": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-loader/-/postcss-loader-3.0.0.tgz",
                "integrity": "sha512-cLWoDEY5OwHcAjDnkyRQzAXfs2jrKjXpO/HQFcc5b5u/r7aa471wdmChmwfnv7x2u840iat/wi0lQ5nbRgSkUA==",
                "requires": {
                "loader-utils": "^1.1.0",
                  "postcss": "^7.0.0",
                  "postcss-load-config": "^2.0.0",
                  "schema-utils": "^1.0.0"
              },
              "dependencies": {
                "schema-utils": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
                    "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
                    "requires": {
                    "ajv": "^6.1.0",
                      "ajv-errors": "^1.0.0",
                      "ajv-keywords": "^3.1.0"
                  }
                }
              }
            },
            "postcss-logical": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-logical/-/postcss-logical-3.0.0.tgz",
                "integrity": "sha512-1SUKdJc2vuMOmeItqGuNaC+N8MzBWFWEkAnRnLpFYj1tGGa7NqyVBujfRtgNa2gXR+6RkGUiB2O5Vmh7E2RmiA==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-media-minmax": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/postcss-media-minmax/-/postcss-media-minmax-4.0.0.tgz",
                "integrity": "sha512-fo9moya6qyxsjbFAYl97qKO9gyre3qvbMnkOZeZwlsW6XYFsvs2DMGDlchVLfAd8LHPZDxivu/+qW2SMQeTHBw==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-merge-longhand": {
              "version": "4.0.11",
                "resolved": "https://registry.npmjs.org/postcss-merge-longhand/-/postcss-merge-longhand-4.0.11.tgz",
                "integrity": "sha512-alx/zmoeXvJjp7L4mxEMjh8lxVlDFX1gqWHzaaQewwMZiVhLo42TEClKaeHbRf6J7j82ZOdTJ808RtN0ZOZwvw==",
                "requires": {
                "css-color-names": "0.0.4",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0",
                  "stylehacks": "^4.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-merge-rules": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/postcss-merge-rules/-/postcss-merge-rules-4.0.3.tgz",
                "integrity": "sha512-U7e3r1SbvYzO0Jr3UT/zKBVgYYyhAz0aitvGIYOYK5CPmkNih+WDSsS5tvPrJ8YMQYlEMvsZIiqmn7HdFUaeEQ==",
                "requires": {
                "browserslist": "^4.0.0",
                  "caniuse-api": "^3.0.0",
                  "cssnano-util-same-parent": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-selector-parser": "^3.0.0",
                  "vendors": "^1.0.0"
              },
              "dependencies": {
                "postcss-selector-parser": {
                  "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
                    "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
                    "requires": {
                    "dot-prop": "^4.1.1",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-minify-font-values": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-minify-font-values/-/postcss-minify-font-values-4.0.2.tgz",
                "integrity": "sha512-j85oO6OnRU9zPf04+PZv1LYIYOprWm6IA6zkXkrJXyRveDEuQggG6tvoy8ir8ZwjLxLuGfNkCZEQG7zan+Hbtg==",
                "requires": {
                "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-minify-gradients": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-minify-gradients/-/postcss-minify-gradients-4.0.2.tgz",
                "integrity": "sha512-qKPfwlONdcf/AndP1U8SJ/uzIJtowHlMaSioKzebAXSG4iJthlWC9iSWznQcX4f66gIWX44RSA841HTHj3wK+Q==",
                "requires": {
                "cssnano-util-get-arguments": "^4.0.0",
                  "is-color-stop": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-minify-params": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-minify-params/-/postcss-minify-params-4.0.2.tgz",
                "integrity": "sha512-G7eWyzEx0xL4/wiBBJxJOz48zAKV2WG3iZOqVhPet/9geefm/Px5uo1fzlHu+DOjT+m0Mmiz3jkQzVHe6wxAWg==",
                "requires": {
                "alphanum-sort": "^1.0.0",
                  "browserslist": "^4.0.0",
                  "cssnano-util-get-arguments": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0",
                  "uniqs": "^2.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-minify-selectors": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-minify-selectors/-/postcss-minify-selectors-4.0.2.tgz",
                "integrity": "sha512-D5S1iViljXBj9kflQo4YutWnJmwm8VvIsU1GeXJGiG9j8CIg9zs4voPMdQDUmIxetUOh60VilsNzCiAFTOqu3g==",
                "requires": {
                "alphanum-sort": "^1.0.0",
                  "has": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-selector-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-selector-parser": {
                  "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
                    "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
                    "requires": {
                    "dot-prop": "^4.1.1",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-modules-extract-imports": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/postcss-modules-extract-imports/-/postcss-modules-extract-imports-2.0.0.tgz",
                "integrity": "sha512-LaYLDNS4SG8Q5WAWqIJgdHPJrDDr/Lv775rMBFUbgjTz6j34lUznACHcdRWroPvXANP2Vj7yNK57vp9eFqzLWQ==",
                "requires": {
                "postcss": "^7.0.5"
              }
            },
            "postcss-modules-local-by-default": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/postcss-modules-local-by-default/-/postcss-modules-local-by-default-3.0.2.tgz",
                "integrity": "sha512-jM/V8eqM4oJ/22j0gx4jrp63GSvDH6v86OqyTHHUvk4/k1vceipZsaymiZ5PvocqZOl5SFHiFJqjs3la0wnfIQ==",
                "requires": {
                "icss-utils": "^4.1.1",
                  "postcss": "^7.0.16",
                  "postcss-selector-parser": "^6.0.2",
                  "postcss-value-parser": "^4.0.0"
              }
            },
            "postcss-modules-scope": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/postcss-modules-scope/-/postcss-modules-scope-2.1.1.tgz",
                "integrity": "sha512-OXRUPecnHCg8b9xWvldG/jUpRIGPNRka0r4D4j0ESUU2/5IOnpsjfPPmDprM3Ih8CgZ8FXjWqaniK5v4rWt3oQ==",
                "requires": {
                "postcss": "^7.0.6",
                  "postcss-selector-parser": "^6.0.0"
              }
            },
            "postcss-modules-values": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-modules-values/-/postcss-modules-values-3.0.0.tgz",
                "integrity": "sha512-1//E5jCBrZ9DmRX+zCtmQtRSV6PV42Ix7Bzj9GbwJceduuf7IqP8MgeTXuRDHOWj2m0VzZD5+roFWDuU8RQjcg==",
                "requires": {
                "icss-utils": "^4.0.0",
                  "postcss": "^7.0.6"
              }
            },
            "postcss-nesting": {
              "version": "7.0.1",
                "resolved": "https://registry.npmjs.org/postcss-nesting/-/postcss-nesting-7.0.1.tgz",
                "integrity": "sha512-FrorPb0H3nuVq0Sff7W2rnc3SmIcruVC6YwpcS+k687VxyxO33iE1amna7wHuRVzM8vfiYofXSBHNAZ3QhLvYg==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-normalize": {
              "version": "8.0.1",
                "resolved": "https://registry.npmjs.org/postcss-normalize/-/postcss-normalize-8.0.1.tgz",
                "integrity": "sha512-rt9JMS/m9FHIRroDDBGSMsyW1c0fkvOJPy62ggxSHUldJO7B195TqFMqIf+lY5ezpDcYOV4j86aUp3/XbxzCCQ==",
                "requires": {
                "@csstools/normalize.css": "^10.1.0",
                  "browserslist": "^4.6.2",
                  "postcss": "^7.0.17",
                  "postcss-browser-comments": "^3.0.0",
                  "sanitize.css": "^10.0.0"
              }
            },
            "postcss-normalize-charset": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-normalize-charset/-/postcss-normalize-charset-4.0.1.tgz",
                "integrity": "sha512-gMXCrrlWh6G27U0hF3vNvR3w8I1s2wOBILvA87iNXaPvSNo5uZAMYsZG7XjCUf1eVxuPfyL4TJ7++SGZLc9A3g==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-normalize-display-values": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-display-values/-/postcss-normalize-display-values-4.0.2.tgz",
                "integrity": "sha512-3F2jcsaMW7+VtRMAqf/3m4cPFhPD3EFRgNs18u+k3lTJJlVe7d0YPO+bnwqo2xg8YiRpDXJI2u8A0wqJxMsQuQ==",
                "requires": {
                "cssnano-util-get-match": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-positions": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-positions/-/postcss-normalize-positions-4.0.2.tgz",
                "integrity": "sha512-Dlf3/9AxpxE+NF1fJxYDeggi5WwV35MXGFnnoccP/9qDtFrTArZ0D0R+iKcg5WsUd8nUYMIl8yXDCtcrT8JrdA==",
                "requires": {
                "cssnano-util-get-arguments": "^4.0.0",
                  "has": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-repeat-style": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-repeat-style/-/postcss-normalize-repeat-style-4.0.2.tgz",
                "integrity": "sha512-qvigdYYMpSuoFs3Is/f5nHdRLJN/ITA7huIoCyqqENJe9PvPmLhNLMu7QTjPdtnVf6OcYYO5SHonx4+fbJE1+Q==",
                "requires": {
                "cssnano-util-get-arguments": "^4.0.0",
                  "cssnano-util-get-match": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-string": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-string/-/postcss-normalize-string-4.0.2.tgz",
                "integrity": "sha512-RrERod97Dnwqq49WNz8qo66ps0swYZDSb6rM57kN2J+aoyEAJfZ6bMx0sx/F9TIEX0xthPGCmeyiam/jXif0eA==",
                "requires": {
                "has": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-timing-functions": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-timing-functions/-/postcss-normalize-timing-functions-4.0.2.tgz",
                "integrity": "sha512-acwJY95edP762e++00Ehq9L4sZCEcOPyaHwoaFOhIwWCDfik6YvqsYNxckee65JHLKzuNSSmAdxwD2Cud1Z54A==",
                "requires": {
                "cssnano-util-get-match": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-unicode": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-normalize-unicode/-/postcss-normalize-unicode-4.0.1.tgz",
                "integrity": "sha512-od18Uq2wCYn+vZ/qCOeutvHjB5jm57ToxRaMeNuf0nWVHaP9Hua56QyMF6fs/4FSUnVIw0CBPsU0K4LnBPwYwg==",
                "requires": {
                "browserslist": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-url": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-normalize-url/-/postcss-normalize-url-4.0.1.tgz",
                "integrity": "sha512-p5oVaF4+IHwu7VpMan/SSpmpYxcJMtkGppYf0VbdH5B6hN8YNmVyJLuY9FmLQTzY3fag5ESUUHDqM+heid0UVA==",
                "requires": {
                "is-absolute-url": "^2.0.0",
                  "normalize-url": "^3.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "normalize-url": {
                  "version": "3.3.0",
                    "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-3.3.0.tgz",
                    "integrity": "sha512-U+JJi7duF1o+u2pynbp2zXDW2/PADgC30f0GsHZtRh+HOcXHnw137TrNlyxxRvWW5fjKd3bcLHPxofWuCjaeZg=="
                },
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-normalize-whitespace": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-normalize-whitespace/-/postcss-normalize-whitespace-4.0.2.tgz",
                "integrity": "sha512-tO8QIgrsI3p95r8fyqKV+ufKlSHh9hMJqACqbv2XknufqEDhDvbguXGBBqxw9nsQoXWf0qOqppziKJKHMD4GtA==",
                "requires": {
                "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-ordered-values": {
              "version": "4.1.2",
                "resolved": "https://registry.npmjs.org/postcss-ordered-values/-/postcss-ordered-values-4.1.2.tgz",
                "integrity": "sha512-2fCObh5UanxvSxeXrtLtlwVThBvHn6MQcu4ksNT2tsaV2Fg76R2CV98W7wNSlX+5/pFwEyaDwKLLoEV7uRybAw==",
                "requires": {
                "cssnano-util-get-arguments": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-overflow-shorthand": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/postcss-overflow-shorthand/-/postcss-overflow-shorthand-2.0.0.tgz",
                "integrity": "sha512-aK0fHc9CBNx8jbzMYhshZcEv8LtYnBIRYQD5i7w/K/wS9c2+0NSR6B3OVMu5y0hBHYLcMGjfU+dmWYNKH0I85g==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-page-break": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/postcss-page-break/-/postcss-page-break-2.0.0.tgz",
                "integrity": "sha512-tkpTSrLpfLfD9HvgOlJuigLuk39wVTbbd8RKcy8/ugV2bNBUW3xU+AIqyxhDrQr1VUj1RmyJrBn1YWrqUm9zAQ==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-place": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-place/-/postcss-place-4.0.1.tgz",
                "integrity": "sha512-Zb6byCSLkgRKLODj/5mQugyuj9bvAAw9LqJJjgwz5cYryGeXfFZfSXoP1UfveccFmeq0b/2xxwcTEVScnqGxBg==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-values-parser": "^2.0.0"
              }
            },
            "postcss-preset-env": {
              "version": "6.7.0",
                "resolved": "https://registry.npmjs.org/postcss-preset-env/-/postcss-preset-env-6.7.0.tgz",
                "integrity": "sha512-eU4/K5xzSFwUFJ8hTdTQzo2RBLbDVt83QZrAvI07TULOkmyQlnYlpwep+2yIK+K+0KlZO4BvFcleOCCcUtwchg==",
                "requires": {
                "autoprefixer": "^9.6.1",
                  "browserslist": "^4.6.4",
                  "caniuse-lite": "^1.0.30000981",
                  "css-blank-pseudo": "^0.1.4",
                  "css-has-pseudo": "^0.10.0",
                  "css-prefers-color-scheme": "^3.1.1",
                  "cssdb": "^4.4.0",
                  "postcss": "^7.0.17",
                  "postcss-attribute-case-insensitive": "^4.0.1",
                  "postcss-color-functional-notation": "^2.0.1",
                  "postcss-color-gray": "^5.0.0",
                  "postcss-color-hex-alpha": "^5.0.3",
                  "postcss-color-mod-function": "^3.0.3",
                  "postcss-color-rebeccapurple": "^4.0.1",
                  "postcss-custom-media": "^7.0.8",
                  "postcss-custom-properties": "^8.0.11",
                  "postcss-custom-selectors": "^5.1.2",
                  "postcss-dir-pseudo-class": "^5.0.0",
                  "postcss-double-position-gradients": "^1.0.0",
                  "postcss-env-function": "^2.0.2",
                  "postcss-focus-visible": "^4.0.0",
                  "postcss-focus-within": "^3.0.0",
                  "postcss-font-variant": "^4.0.0",
                  "postcss-gap-properties": "^2.0.0",
                  "postcss-image-set-function": "^3.0.1",
                  "postcss-initial": "^3.0.0",
                  "postcss-lab-function": "^2.0.1",
                  "postcss-logical": "^3.0.0",
                  "postcss-media-minmax": "^4.0.0",
                  "postcss-nesting": "^7.0.0",
                  "postcss-overflow-shorthand": "^2.0.0",
                  "postcss-page-break": "^2.0.0",
                  "postcss-place": "^4.0.1",
                  "postcss-pseudo-class-any-link": "^6.0.0",
                  "postcss-replace-overflow-wrap": "^3.0.0",
                  "postcss-selector-matches": "^4.0.0",
                  "postcss-selector-not": "^4.0.0"
              }
            },
            "postcss-pseudo-class-any-link": {
              "version": "6.0.0",
                "resolved": "https://registry.npmjs.org/postcss-pseudo-class-any-link/-/postcss-pseudo-class-any-link-6.0.0.tgz",
                "integrity": "sha512-lgXW9sYJdLqtmw23otOzrtbDXofUdfYzNm4PIpNE322/swES3VU9XlXHeJS46zT2onFO7V1QFdD4Q9LiZj8mew==",
                "requires": {
                "postcss": "^7.0.2",
                  "postcss-selector-parser": "^5.0.0-rc.3"
              },
              "dependencies": {
                "cssesc": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-2.0.0.tgz",
                    "integrity": "sha512-MsCAG1z9lPdoO/IUMLSBWBSVxVtJ1395VGIQ+Fc2gNdkQ1hNDnQdw3YhA71WJCBW1vdwA0cAnk/DnW6bqoEUYg=="
                },
                "postcss-selector-parser": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-5.0.0.tgz",
                    "integrity": "sha512-w+zLE5Jhg6Liz8+rQOWEAwtwkyqpfnmsinXjXg6cY7YIONZZtgvE0v2O0uhQBs0peNomOJwWRKt6JBfTdTd3OQ==",
                    "requires": {
                    "cssesc": "^2.0.0",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "postcss-reduce-initial": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/postcss-reduce-initial/-/postcss-reduce-initial-4.0.3.tgz",
                "integrity": "sha512-gKWmR5aUulSjbzOfD9AlJiHCGH6AEVLaM0AV+aSioxUDd16qXP1PCh8d1/BGVvpdWn8k/HiK7n6TjeoXN1F7DA==",
                "requires": {
                "browserslist": "^4.0.0",
                  "caniuse-api": "^3.0.0",
                  "has": "^1.0.0",
                  "postcss": "^7.0.0"
              }
            },
            "postcss-reduce-transforms": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-reduce-transforms/-/postcss-reduce-transforms-4.0.2.tgz",
                "integrity": "sha512-EEVig1Q2QJ4ELpJXMZR8Vt5DQx8/mo+dGWSR7vWXqcob2gQLyQGsionYcGKATXvQzMPn6DSN1vTN7yFximdIAg==",
                "requires": {
                "cssnano-util-get-match": "^4.0.0",
                  "has": "^1.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-replace-overflow-wrap": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/postcss-replace-overflow-wrap/-/postcss-replace-overflow-wrap-3.0.0.tgz",
                "integrity": "sha512-2T5hcEHArDT6X9+9dVSPQdo7QHzG4XKclFT8rU5TzJPDN7RIRTbO9c4drUISOVemLj03aezStHCR2AIcr8XLpw==",
                "requires": {
                "postcss": "^7.0.2"
              }
            },
            "postcss-safe-parser": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-safe-parser/-/postcss-safe-parser-4.0.1.tgz",
                "integrity": "sha512-xZsFA3uX8MO3yAda03QrG3/Eg1LN3EPfjjf07vke/46HERLZyHrTsQ9E1r1w1W//fWEhtYNndo2hQplN2cVpCQ==",
                "requires": {
                "postcss": "^7.0.0"
              }
            },
            "postcss-selector-matches": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/postcss-selector-matches/-/postcss-selector-matches-4.0.0.tgz",
                "integrity": "sha512-LgsHwQR/EsRYSqlwdGzeaPKVT0Ml7LAT6E75T8W8xLJY62CE4S/l03BWIt3jT8Taq22kXP08s2SfTSzaraoPww==",
                "requires": {
                "balanced-match": "^1.0.0",
                  "postcss": "^7.0.2"
              }
            },
            "postcss-selector-not": {
              "version": "4.0.0",
                "resolved": "https://registry.npmjs.org/postcss-selector-not/-/postcss-selector-not-4.0.0.tgz",
                "integrity": "sha512-W+bkBZRhqJaYN8XAnbbZPLWMvZD1wKTu0UxtFKdhtGjWYmxhkUneoeOhRJKdAE5V7ZTlnbHfCR+6bNwK9e1dTQ==",
                "requires": {
                "balanced-match": "^1.0.0",
                  "postcss": "^7.0.2"
              }
            },
            "postcss-selector-parser": {
              "version": "6.0.2",
                "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.2.tgz",
                "integrity": "sha512-36P2QR59jDTOAiIkqEprfJDsoNrvwFei3eCqKd1Y0tUsBimsq39BLp7RD+JWny3WgB1zGhJX8XVePwm9k4wdBg==",
                "requires": {
                "cssesc": "^3.0.0",
                  "indexes-of": "^1.0.1",
                  "uniq": "^1.0.1"
              }
            },
            "postcss-svgo": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-svgo/-/postcss-svgo-4.0.2.tgz",
                "integrity": "sha512-C6wyjo3VwFm0QgBy+Fu7gCYOkCmgmClghO+pjcxvrcBKtiKt0uCF+hvbMO1fyv5BMImRK90SMb+dwUnfbGd+jw==",
                "requires": {
                "is-svg": "^3.0.0",
                  "postcss": "^7.0.0",
                  "postcss-value-parser": "^3.0.0",
                  "svgo": "^1.0.0"
              },
              "dependencies": {
                "postcss-value-parser": {
                  "version": "3.3.1",
                    "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-3.3.1.tgz",
                    "integrity": "sha512-pISE66AbVkp4fDQ7VHBwRNXzAAKJjw4Vw7nWI/+Q3vuly7SNfgYXvm6i5IgFylHGK5sP/xHAbB7N49OS4gWNyQ=="
                }
              }
            },
            "postcss-unique-selectors": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/postcss-unique-selectors/-/postcss-unique-selectors-4.0.1.tgz",
                "integrity": "sha512-+JanVaryLo9QwZjKrmJgkI4Fn8SBgRO6WXQBJi7KiAVPlmxikB5Jzc4EvXMT2H0/m0RjrVVm9rGNhZddm/8Spg==",
                "requires": {
                "alphanum-sort": "^1.0.0",
                  "postcss": "^7.0.0",
                  "uniqs": "^2.0.0"
              }
            },
            "postcss-value-parser": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.0.2.tgz",
                "integrity": "sha512-LmeoohTpp/K4UiyQCwuGWlONxXamGzCMtFxLq4W1nZVGIQLYvMCJx3yAF9qyyuFpflABI9yVdtJAqbihOsCsJQ=="
            },
            "postcss-values-parser": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/postcss-values-parser/-/postcss-values-parser-2.0.1.tgz",
                "integrity": "sha512-2tLuBsA6P4rYTNKCXYG/71C7j1pU6pK503suYOmn4xYrQIzW+opD+7FAFNuGSdZC/3Qfy334QbeMu7MEb8gOxg==",
                "requires": {
                "flatten": "^1.0.2",
                  "indexes-of": "^1.0.1",
                  "uniq": "^1.0.1"
              }
            },
            "prelude-ls": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
                "integrity": "sha1-IZMqVJ9eUv/ZqCf1cOBL5iqX2lQ="
            },
            "prepend-http": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/prepend-http/-/prepend-http-1.0.4.tgz",
                "integrity": "sha1-1PRWKwzjaW5BrFLQ4ALlemNdxtw="
            },
            "preserve": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",
                "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks=",
                "dev": true,
                "optional": true
            },
            "pretty-bytes": {
              "version": "5.3.0",
                "resolved": "https://registry.npmjs.org/pretty-bytes/-/pretty-bytes-5.3.0.tgz",
                "integrity": "sha512-hjGrh+P926p4R4WbaB6OckyRtO0F0/lQBiT+0gnxjV+5kjPBrfVBFCsCLbMqVQeydvIoouYTCmmEURiH3R1Bdg=="
            },
            "pretty-error": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/pretty-error/-/pretty-error-2.1.1.tgz",
                "integrity": "sha1-X0+HyPkeWuPzuoerTPXgOxoX8aM=",
                "requires": {
                "renderkid": "^2.0.1",
                  "utila": "~0.4"
              }
            },
            "pretty-format": {
              "version": "24.9.0",
                "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-24.9.0.tgz",
                "integrity": "sha512-00ZMZUiHaJrNfk33guavqgvfJS30sLYf0f8+Srklv0AMPodGGHcoHgksZ3OThYnIvOd+8yMCn0YiEOogjlgsnA==",
                "requires": {
                "@jest/types": "^24.9.0",
                  "ansi-regex": "^4.0.0",
                  "ansi-styles": "^3.2.0",
                  "react-is": "^16.8.4"
              },
              "dependencies": {
                "ansi-regex": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
                    "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
                }
              }
            },
            "private": {
              "version": "0.1.8",
                "resolved": "https://registry.npmjs.org/private/-/private-0.1.8.tgz",
                "integrity": "sha512-VvivMrbvd2nKkiG38qjULzlc+4Vx4wm/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/cJPet5J/u19r/mg=="
            },
            "process": {
              "version": "0.11.10",
                "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
                "integrity": "sha1-czIwDoQBYb2j5podHZGn1LwW8YI="
            },
            "process-nextick-args": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/process-nextick-args/-/process-nextick-args-2.0.1.tgz",
                "integrity": "sha512-3ouUOpQhtgrbOa17J7+uxOTpITYWaGP7/AhoR3+A+/1e9skrzelGi/dXzEYyvbxubEF6Wn2ypscTKiKJFFn1ag=="
            },
            "progress": {
              "version": "2.0.3",
                "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",
                "integrity": "sha512-7PiHtLll5LdnKIMw100I+8xJXR5gW2QwWYkT6iJva0bXitZKa/XMrSbdmg3r2Xnaidz9Qumd0VPaMrZlF9V9sA=="
            },
            "promise": {
              "version": "7.3.1",
                "resolved": "https://registry.npmjs.org/promise/-/promise-7.3.1.tgz",
                "integrity": "sha512-nolQXZ/4L+bP/UGlkfaIujX9BKxGwmQ9OT4mOt5yvy8iK1h3wqTEJCijzGANTCCl9nWjY41juyAn2K3Q1hLLTg==",
                "requires": {
                "asap": "~2.0.3"
              }
            },
            "promise-inflight": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/promise-inflight/-/promise-inflight-1.0.1.tgz",
                "integrity": "sha1-mEcocL8igTL8vdhoEputEsPAKeM="
            },
            "prompts": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.3.0.tgz",
                "integrity": "sha512-NfbbPPg/74fT7wk2XYQ7hAIp9zJyZp5Fu19iRbORqqy1BhtrkZ0fPafBU+7bmn8ie69DpT0R6QpJIN2oisYjJg==",
                "requires": {
                "kleur": "^3.0.3",
                  "sisteransi": "^1.0.3"
              }
            },
            "prop-types": {
              "version": "15.7.2",
                "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.7.2.tgz",
                "integrity": "sha512-8QQikdH7//R2vurIJSutZ1smHYTcLpRWEOlHnzcWHmBYrOGUysKwSsrC89BCiFj3CbrfJ/nXFdJepOVrY1GCHQ==",
                "requires": {
                "loose-envify": "^1.4.0",
                  "object-assign": "^4.1.1",
                  "react-is": "^16.8.1"
              }
            },
            "proxy-addr": {
              "version": "2.0.5",
                "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.5.tgz",
                "integrity": "sha512-t/7RxHXPH6cJtP0pRG6smSr9QJidhB+3kXu0KgXnbGYMgzEnUxRQ4/LDdfOwZEMyIh3/xHb8PX3t+lfL9z+YVQ==",
                "requires": {
                "forwarded": "~0.1.2",
                  "ipaddr.js": "1.9.0"
              }
            },
            "prr": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/prr/-/prr-1.0.1.tgz",
                "integrity": "sha1-0/wRS6BplaRexok/SEzrHXj19HY="
            },
            "pseudomap": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/pseudomap/-/pseudomap-1.0.2.tgz",
                "integrity": "sha1-8FKijacOYYkX7wqKw0wa5aaChrM="
            },
            "psl": {
              "version": "1.7.0",
                "resolved": "https://registry.npmjs.org/psl/-/psl-1.7.0.tgz",
                "integrity": "sha512-5NsSEDv8zY70ScRnOTn7bK7eanl2MvFrOrS/R6x+dBt5g1ghnj9Zv90kO8GwT8gxcu2ANyFprnFYB85IogIJOQ=="
            },
            "public-encrypt": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/public-encrypt/-/public-encrypt-4.0.3.tgz",
                "integrity": "sha512-zVpa8oKZSz5bTMTFClc1fQOnyyEzpl5ozpi1B5YcvBrdohMjH2rfsBtyXcuNuwjsDIXmBYlF2N5FlJYhR29t8Q==",
                "requires": {
                "bn.js": "^4.1.0",
                  "browserify-rsa": "^4.0.0",
                  "create-hash": "^1.1.0",
                  "parse-asn1": "^5.0.0",
                  "randombytes": "^2.0.1",
                  "safe-buffer": "^5.1.2"
              }
            },
            "pump": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
                "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
                "requires": {
                "end-of-stream": "^1.1.0",
                  "once": "^1.3.1"
              }
            },
            "pumpify": {
              "version": "1.5.1",
                "resolved": "https://registry.npmjs.org/pumpify/-/pumpify-1.5.1.tgz",
                "integrity": "sha512-oClZI37HvuUJJxSKKrC17bZ9Cu0ZYhEAGPsPUy9KlMUmv9dKX2o77RUmq7f3XjIxbwyGwYzbzQ1L2Ks8sIradQ==",
                "requires": {
                "duplexify": "^3.6.0",
                  "inherits": "^2.0.3",
                  "pump": "^2.0.0"
              },
              "dependencies": {
                "pump": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/pump/-/pump-2.0.1.tgz",
                    "integrity": "sha512-ruPMNRkN3MHP1cWJc9OWr+T/xDP0jhXYCLfJcBuX54hhfIBnaQmAUMfDcG4DM5UMWByBbJY69QSphm3jtDKIkA==",
                    "requires": {
                    "end-of-stream": "^1.1.0",
                      "once": "^1.3.1"
                  }
                }
              }
            },
            "punycode": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.1.1.tgz",
                "integrity": "sha512-XRsRjdf+j5ml+y/6GKHPZbrF/8p2Yga0JPtdqTIY2Xe5ohJPD9saDJJLPvp9+NSBprVvevdXZybnj2cv8OEd0A=="
            },
            "q": {
              "version": "1.5.1",
                "resolved": "https://registry.npmjs.org/q/-/q-1.5.1.tgz",
                "integrity": "sha1-fjL3W0E4EpHQRhHxvxQQmsAGUdc="
            },
            "qs": {
              "version": "6.5.2",
                "resolved": "https://registry.npmjs.org/qs/-/qs-6.5.2.tgz",
                "integrity": "sha512-N5ZAX4/LxJmF+7wN74pUD6qAh9/wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91/odN2dW/WOl7qQHNDGA=="
            },
            "query-string": {
              "version": "4.3.4",
                "resolved": "https://registry.npmjs.org/query-string/-/query-string-4.3.4.tgz",
                "integrity": "sha1-u7aTucqRXCMlFbIosaArYJBD2+s=",
                "requires": {
                "object-assign": "^4.1.0",
                  "strict-uri-encode": "^1.0.0"
              }
            },
            "querystring": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/querystring/-/querystring-0.2.0.tgz",
                "integrity": "sha1-sgmEkgO7Jd+CDadW50cAWHhSFiA="
            },
            "querystring-es3": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/querystring-es3/-/querystring-es3-0.2.1.tgz",
                "integrity": "sha1-nsYfeQSYdXB9aUFFlv2Qek1xHnM="
            },
            "querystringify": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/querystringify/-/querystringify-2.1.1.tgz",
                "integrity": "sha512-w7fLxIRCRT7U8Qu53jQnJyPkYZIaR4n5151KMfcJlO/A9397Wxb1amJvROTK6TOnp7PfoAmg/qXiNHI+08jRfA=="
            },
            "raf": {
              "version": "3.4.1",
                "resolved": "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz",
                "integrity": "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==",
                "requires": {
                "performance-now": "^2.1.0"
              }
            },
            "random-hash": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/random-hash/-/random-hash-4.0.1.tgz",
                "integrity": "sha1-NC19FFAeZk8L7i2aE+6unJc8t1U="
            },
            "randomatic": {
              "version": "3.1.1",
                "resolved": "https://registry.npmjs.org/randomatic/-/randomatic-3.1.1.tgz",
                "integrity": "sha512-TuDE5KxZ0J461RVjrJZCJc+J+zCkTb1MbH9AQUq68sMhOMcy9jLcb3BrZKgp9q9Ncltdg4QVqWrH02W2EFFVYw==",
                "dev": true,
                "optional": true,
                "requires": {
                "is-number": "^4.0.0",
                  "kind-of": "^6.0.0",
                  "math-random": "^1.0.1"
              },
              "dependencies": {
                "is-number": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
                    "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
                    "dev": true,
                    "optional": true
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA==",
                    "dev": true,
                    "optional": true
                }
              }
            },
            "randombytes": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
                "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
                "requires": {
                "safe-buffer": "^5.1.0"
              }
            },
            "randomfill": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/randomfill/-/randomfill-1.0.4.tgz",
                "integrity": "sha512-87lcbR8+MhcWcUiQ+9e+Rwx8MyR2P7qnt15ynUlbm3TU/fjbgz4GsvfSUDTemtCCtVCqb4ZcEFlyPNTh9bBTLw==",
                "requires": {
                "randombytes": "^2.0.5",
                  "safe-buffer": "^5.1.0"
              }
            },
            "range-parser": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
                "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg=="
            },
            "raw-body": {
              "version": "2.4.0",
                "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.4.0.tgz",
                "integrity": "sha512-4Oz8DUIwdvoa5qMJelxipzi/iJIi40O5cGV1wNYp5hvZP8ZN0T+jiNkL0QepXs+EsQ9XJ8ipEDoiH70ySUJP3Q==",
                "requires": {
                "bytes": "3.1.0",
                  "http-errors": "1.7.2",
                  "iconv-lite": "0.4.24",
                  "unpipe": "1.0.0"
              },
              "dependencies": {
                "bytes": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.0.tgz",
                    "integrity": "sha512-zauLjrfCG+xvoyaqLoV8bLVXXNGC4JqlxFCutSDWA6fJrTo2ZuvLYTqZ7aHBLZSMOopbzwv8f+wZcVzfVTI2Dg=="
                }
              }
            },
            "rc-align": {
              "version": "2.4.5",
                "resolved": "https://registry.npmjs.org/rc-align/-/rc-align-2.4.5.tgz",
                "integrity": "sha512-nv9wYUYdfyfK+qskThf4BQUSIadeI/dCsfaMZfNEoxm9HwOIioQ+LyqmMK6jWHAZQgOzMLaqawhuBXlF63vgjw==",
                "requires": {
                "babel-runtime": "^6.26.0",
                  "dom-align": "^1.7.0",
                  "prop-types": "^15.5.8",
                  "rc-util": "^4.0.4"
              }
            },
            "rc-animate": {
              "version": "2.10.2",
                "resolved": "https://registry.npmjs.org/rc-animate/-/rc-animate-2.10.2.tgz",
                "integrity": "sha512-cE/A7piAzoWFSgUD69NmmMraqCeqVBa51UErod8NS3LUEqWfppSVagHfa0qHAlwPVPiIBg3emRONyny3eiH0Dg==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.6",
                  "css-animation": "^1.3.2",
                  "prop-types": "15.x",
                  "raf": "^3.4.0",
                  "rc-util": "^4.15.3",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-calendar": {
              "version": "9.14.5",
                "resolved": "https://registry.npmjs.org/rc-calendar/-/rc-calendar-9.14.5.tgz",
                "integrity": "sha512-UCo2O7e3hfOJrV0pkBzpw5vedwyn08YTWvErMTvYbz3nE7rLehXH6i2ABUe1fMCIXoH+YDhQ085SRJgKyA3mZA==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "2.x",
                  "moment": "2.x",
                  "prop-types": "^15.5.8",
                  "rc-trigger": "^2.2.0",
                  "rc-util": "^4.1.1",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-cascader": {
              "version": "0.17.5",
                "resolved": "https://registry.npmjs.org/rc-cascader/-/rc-cascader-0.17.5.tgz",
                "integrity": "sha512-WYMVcxU0+Lj+xLr4YYH0+yXODumvNXDcVEs5i7L1mtpWwYkubPV/zbQpn+jGKFCIW/hOhjkU4J1db8/P/UKE7A==",
                "requires": {
                "array-tree-filter": "^2.1.0",
                  "prop-types": "^15.5.8",
                  "rc-trigger": "^2.2.0",
                  "rc-util": "^4.0.4",
                  "react-lifecycles-compat": "^3.0.4",
                  "shallow-equal": "^1.0.0",
                  "warning": "^4.0.1"
              }
            },
            "rc-checkbox": {
              "version": "2.1.8",
                "resolved": "https://registry.npmjs.org/rc-checkbox/-/rc-checkbox-2.1.8.tgz",
                "integrity": "sha512-6qOgh0/by0nVNASx6LZnhRTy17Etcgav+IrI7kL9V9kcDZ/g7K14JFlqrtJ3NjDq/Kyn+BPI1st1XvbkhfaJeg==",
                "requires": {
                "babel-runtime": "^6.23.0",
                  "classnames": "2.x",
                  "prop-types": "15.x",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-collapse": {
              "version": "1.11.8",
                "resolved": "https://registry.npmjs.org/rc-collapse/-/rc-collapse-1.11.8.tgz",
                "integrity": "sha512-8EhfPyScTYljkbRuIoHniSwZagD5UPpZ3CToYgoNYWC85L2qCbPYF7+OaC713FOrIkp6NbfNqXsITNxmDAmxog==",
                "requires": {
                "classnames": "2.x",
                  "css-animation": "1.x",
                  "prop-types": "^15.5.6",
                  "rc-animate": "2.x",
                  "react-is": "^16.7.0",
                  "react-lifecycles-compat": "^3.0.4",
                  "shallowequal": "^1.1.0"
              }
            },
            "rc-dialog": {
              "version": "7.4.1",
                "resolved": "https://registry.npmjs.org/rc-dialog/-/rc-dialog-7.4.1.tgz",
                "integrity": "sha512-vvVVP7AUjxs2AEGL5GUr6BjfVzaiBV5RoiPYchCDqHmf8n7xTrfsACAhZ2Vezj6mtl2446zhxoGvhxNpyCyX7A==",
                "requires": {
                "babel-runtime": "6.x",
                  "rc-animate": "2.x",
                  "rc-util": "^4.4.0"
              }
            },
            "rc-drawer": {
              "version": "1.9.9",
                "resolved": "https://registry.npmjs.org/rc-drawer/-/rc-drawer-1.9.9.tgz",
                "integrity": "sha512-4oG0okZ7JhOTnGHRkxhOO1yb1U13v5ocns+40xmfogdD+oVNTKHIamCU1cKVVcMQYWpUCn8aYbawY2JuuGN/pA==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.5",
                  "prop-types": "^15.5.0",
                  "rc-util": "^4.5.1"
              }
            },
            "rc-dropdown": {
              "version": "2.4.1",
                "resolved": "https://registry.npmjs.org/rc-dropdown/-/rc-dropdown-2.4.1.tgz",
                "integrity": "sha512-p0XYn0wrOpAZ2fUGE6YJ6U8JBNc5ASijznZ6dkojdaEfQJAeZtV9KMEewhxkVlxGSbbdXe10ptjBlTEW9vEwEg==",
                "requires": {
                "babel-runtime": "^6.26.0",
                  "classnames": "^2.2.6",
                  "prop-types": "^15.5.8",
                  "rc-trigger": "^2.5.1",
                  "react-lifecycles-compat": "^3.0.2"
              }
            },
            "rc-editor-core": {
              "version": "0.8.10",
                "resolved": "https://registry.npmjs.org/rc-editor-core/-/rc-editor-core-0.8.10.tgz",
                "integrity": "sha512-T3aHpeMCIYA1sdAI7ynHHjXy5fqp83uPlD68ovZ0oClTSc3tbHmyCxXlA+Ti4YgmcpCYv7avF6a+TIbAka53kw==",
                "requires": {
                "babel-runtime": "^6.26.0",
                  "classnames": "^2.2.5",
                  "draft-js": "^0.10.0",
                  "immutable": "^3.7.4",
                  "lodash": "^4.16.5",
                  "prop-types": "^15.5.8",
                  "setimmediate": "^1.0.5"
              }
            },
            "rc-editor-mention": {
              "version": "1.1.13",
                "resolved": "https://registry.npmjs.org/rc-editor-mention/-/rc-editor-mention-1.1.13.tgz",
                "integrity": "sha512-3AOmGir91Fi2ogfRRaXLtqlNuIwQpvla7oUnGHS1+3eo7b+fUp5IlKcagqtwUBB5oDNofoySXkLBxzWvSYNp/Q==",
                "requires": {
                "babel-runtime": "^6.23.0",
                  "classnames": "^2.2.5",
                  "dom-scroll-into-view": "^1.2.0",
                  "draft-js": "~0.10.0",
                  "immutable": "~3.7.4",
                  "prop-types": "^15.5.8",
                  "rc-animate": "^2.3.0",
                  "rc-editor-core": "~0.8.3"
              }
            },
            "rc-form": {
              "version": "2.4.11",
                "resolved": "https://registry.npmjs.org/rc-form/-/rc-form-2.4.11.tgz",
                "integrity": "sha512-8BL+FNlFLTOY/A5X6tU35GQJLSIpsmqpwn/tFAYQTczXc4dMJ33ggtH248Cum8+LS0jLTsJKG2L4Qp+1CkY+sA==",
                "requires": {
                "async-validator": "~1.11.3",
                  "babel-runtime": "6.x",
                  "create-react-class": "^15.5.3",
                  "dom-scroll-into-view": "1.x",
                  "hoist-non-react-statics": "^3.3.0",
                  "lodash": "^4.17.4",
                  "rc-util": "^4.15.3",
                  "warning": "^4.0.3"
              }
            },
            "rc-form-hooks": {
              "version": "0.0.1-alpha.14",
                "resolved": "https://registry.npmjs.org/rc-form-hooks/-/rc-form-hooks-0.0.1-alpha.14.tgz",
                "integrity": "sha512-UctsrM6jcYxNTErYgue1SwHWKEPAYRUn2LC2bxIMrbIZuRoeLQBv+FKZbeNTkZDKNSYu0dQ1tDpcldytEezd6Q==",
                "requires": {
                "async-validator": "^2.0.1"
              },
              "dependencies": {
                "async-validator": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/async-validator/-/async-validator-2.0.1.tgz",
                    "integrity": "sha512-sQkJ7Vjgvu9pGCRtDw9CIPuMFstOPtMiMoHqDI3m5xUQhHnHrn/YPBp583IYUaLZi9jW8icGjLlodH0BHSkzeg=="
                }
              }
            },
            "rc-hammerjs": {
              "version": "0.6.9",
                "resolved": "https://registry.npmjs.org/rc-hammerjs/-/rc-hammerjs-0.6.9.tgz",
                "integrity": "sha512-4llgWO3RgLyVbEqUdGsDfzUDqklRlQW5VEhE3x35IvhV+w//VPRG34SBavK3D2mD/UaLKaohgU41V4agiftC8g==",
                "requires": {
                "babel-runtime": "6.x",
                  "hammerjs": "^2.0.8",
                  "prop-types": "^15.5.9"
              }
            },
            "rc-input-number": {
              "version": "4.4.5",
                "resolved": "https://registry.npmjs.org/rc-input-number/-/rc-input-number-4.4.5.tgz",
                "integrity": "sha512-Dt20e8Ylc/N/6oXiPUlwDVdx3fz7W5umUOa4z5pBuWFG7NPlBVXRWkq7+nbnTyaK24UxN67PVpmD3+Omo+QRZQ==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.0",
                  "prop-types": "^15.5.7",
                  "rc-util": "^4.5.1",
                  "rmc-feedback": "^2.0.0"
              }
            },
            "rc-mentions": {
              "version": "0.3.1",
                "resolved": "https://registry.npmjs.org/rc-mentions/-/rc-mentions-0.3.1.tgz",
                "integrity": "sha512-fa5dN3IMTahJfAga1nmma9OymK/ZBV/MZfV11h4kjDmCAVETv5EbAlV0mn6Y+JajvXS6n/XFoPUSF+nwK/AeWw==",
                "requires": {
                "@ant-design/create-react-context": "^0.2.4",
                  "babel-runtime": "^6.23.0",
                  "classnames": "^2.2.6",
                  "rc-menu": "^7.4.22",
                  "rc-trigger": "^2.6.2",
                  "rc-util": "^4.6.0",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-menu": {
              "version": "7.4.32",
                "resolved": "https://registry.npmjs.org/rc-menu/-/rc-menu-7.4.32.tgz",
                "integrity": "sha512-9/ySqniMdvhUhfiUFmqK3hLffYIdeR2nrDDNvXksTCc2ZYd1JmOWF16yO7iYyDPLZM33NU3Qw6EPZd21+FxJsQ==",
                "requires": {
                "classnames": "2.x",
                  "dom-scroll-into-view": "1.x",
                  "mini-store": "^2.0.0",
                  "mutationobserver-shim": "^0.3.2",
                  "rc-animate": "2.x",
                  "rc-trigger": "^2.3.0",
                  "rc-util": "^4.13.0",
                  "resize-observer-polyfill": "^1.5.0"
              }
            },
            "rc-notification": {
              "version": "3.3.1",
                "resolved": "https://registry.npmjs.org/rc-notification/-/rc-notification-3.3.1.tgz",
                "integrity": "sha512-U5+f4BmBVfMSf3OHSLyRagsJ74yKwlrQAtbbL5ijoA0F2C60BufwnOcHG18tVprd7iaIjzZt1TKMmQSYSvgrig==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "2.x",
                  "prop-types": "^15.5.8",
                  "rc-animate": "2.x",
                  "rc-util": "^4.0.4"
              }
            },
            "rc-pagination": {
              "version": "1.20.12",
                "resolved": "https://registry.npmjs.org/rc-pagination/-/rc-pagination-1.20.12.tgz",
                "integrity": "sha512-V1pL0d4nTW00+8b0qS8t12jawmaP14RKT+jFdc32SD76MO3N2kBE/B/zZWPnJHjHTcs0EVhgQC4b2Vgiyy1OJA==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.6",
                  "prop-types": "^15.5.7",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-progress": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/rc-progress/-/rc-progress-2.3.0.tgz",
                "integrity": "sha512-hYBKFSsNgD7jsF8j+ZC1J8y5UIC2X/ktCYI/OQhQNSX6mGV1IXnUCjAd9gbLmzmpChPvKyymRNfckScUNiTpFQ==",
                "requires": {
                "babel-runtime": "6.x",
                  "prop-types": "^15.5.8"
              }
            },
            "rc-rate": {
              "version": "2.5.0",
                "resolved": "https://registry.npmjs.org/rc-rate/-/rc-rate-2.5.0.tgz",
                "integrity": "sha512-aXX5klRqbVZxvLghcKnLqqo7LvLVCHswEDteWsm5Gb7NBIPa1YKTcAbvb5SZ4Z4i4EeRoZaPwygRAWsQgGtbKw==",
                "requires": {
                "classnames": "^2.2.5",
                  "prop-types": "^15.5.8",
                  "rc-util": "^4.3.0",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-select": {
              "version": "9.1.5",
                "resolved": "https://registry.npmjs.org/rc-select/-/rc-select-9.1.5.tgz",
                "integrity": "sha512-P2QDl5xSdrYuvODnwZIKxhBv2AzfsuFNfaoXjRsPTlQvOjLMCGYgyRzZ4xdUy1IAc1yER6LV+g7e4N9Qc+3DDQ==",
                "requires": {
                "babel-runtime": "^6.23.0",
                  "classnames": "2.x",
                  "component-classes": "1.x",
                  "dom-scroll-into-view": "1.x",
                  "prop-types": "^15.5.8",
                  "raf": "^3.4.0",
                  "rc-animate": "2.x",
                  "rc-menu": "^7.3.0",
                  "rc-trigger": "^2.5.4",
                  "rc-util": "^4.0.4",
                  "react-lifecycles-compat": "^3.0.2",
                  "warning": "^4.0.2"
              }
            },
            "rc-slider": {
              "version": "8.6.13",
                "resolved": "https://registry.npmjs.org/rc-slider/-/rc-slider-8.6.13.tgz",
                "integrity": "sha512-fCUe8pPn8n9pq1ARX44nN2nzJoATtna4x/PdskUrxIvZXN8ja7HuceN/hq6kokZjo3FBD2B1yMZvZh6oi68l6Q==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.5",
                  "prop-types": "^15.5.4",
                  "rc-tooltip": "^3.7.0",
                  "rc-util": "^4.0.4",
                  "shallowequal": "^1.0.1",
                  "warning": "^4.0.3"
              }
            },
            "rc-steps": {
              "version": "3.4.1",
                "resolved": "https://registry.npmjs.org/rc-steps/-/rc-steps-3.4.1.tgz",
                "integrity": "sha512-zdeOFmFqiXlXCQyHet1qrDDbGKZ7OQTrlzn8DP5N6M/WqN7HaYoUDy1fZ+NY2htL5WzzVFQpDRKzjiOiHaSqgw==",
                "requires": {
                "babel-runtime": "^6.23.0",
                  "classnames": "^2.2.3",
                  "lodash": "^4.17.5",
                  "prop-types": "^15.5.7"
              }
            },
            "rc-switch": {
              "version": "1.9.0",
                "resolved": "https://registry.npmjs.org/rc-switch/-/rc-switch-1.9.0.tgz",
                "integrity": "sha512-Isas+egaK6qSk64jaEw4GgPStY4umYDbT7ZY93bZF1Af+b/JEsKsJdNOU2qG3WI0Z6tXo2DDq0kJCv8Yhu0zww==",
                "requires": {
                "classnames": "^2.2.1",
                  "prop-types": "^15.5.6",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-table": {
              "version": "6.5.1",
                "resolved": "https://registry.npmjs.org/rc-table/-/rc-table-6.5.1.tgz",
                "integrity": "sha512-Tu6+UQmKV5ZKMs3TB52OUb9oF9epyk/wlSQxGa7eP6fBQfKcjNVEfzVEjayh203IWI39xjHw0cgeMuvTnnRHaQ==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.5",
                  "component-classes": "^1.2.6",
                  "lodash": "^4.17.5",
                  "mini-store": "^2.0.0",
                  "prop-types": "^15.5.8",
                  "rc-util": "^4.0.4",
                  "react-lifecycles-compat": "^3.0.2",
                  "shallowequal": "^1.0.2",
                  "warning": "^3.0.0"
              },
              "dependencies": {
                "warning": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/warning/-/warning-3.0.0.tgz",
                    "integrity": "sha1-MuU3fLVy3kqwR1O9+IIcAe1gW3w=",
                    "requires": {
                    "loose-envify": "^1.0.0"
                  }
                }
              }
            },
            "rc-tabs": {
              "version": "9.6.7",
                "resolved": "https://registry.npmjs.org/rc-tabs/-/rc-tabs-9.6.7.tgz",
                "integrity": "sha512-OXbDOgaqv2MGK9QaDi6cdva6bNz3XGw+M9BHQpm1gTGmVQEGx5VcclDClH/3xobIzooxy8hrxg/s0rTlgDnC2w==",
                "requires": {
                "@ant-design/create-react-context": "^0.2.4",
                  "babel-runtime": "6.x",
                  "classnames": "2.x",
                  "lodash": "^4.17.5",
                  "prop-types": "15.x",
                  "raf": "^3.4.1",
                  "rc-hammerjs": "~0.6.0",
                  "rc-util": "^4.0.4",
                  "react-lifecycles-compat": "^3.0.4",
                  "resize-observer-polyfill": "^1.5.1",
                  "warning": "^4.0.3"
              }
            },
            "rc-time-picker": {
              "version": "3.6.6",
                "resolved": "https://registry.npmjs.org/rc-time-picker/-/rc-time-picker-3.6.6.tgz",
                "integrity": "sha512-NVeJuxWjg9eJ0+jcCCT2dxVY2OBYxOrjsgu8ly0lk9IUJ8lwjS6JU+OibHRPJPew3Smfz88dz7GQRdBE7BcnRA==",
                "requires": {
                "classnames": "2.x",
                  "moment": "2.x",
                  "prop-types": "^15.5.8",
                  "raf": "^3.4.1",
                  "rc-trigger": "^2.2.0"
              }
            },
            "rc-tooltip": {
              "version": "3.7.3",
                "resolved": "https://registry.npmjs.org/rc-tooltip/-/rc-tooltip-3.7.3.tgz",
                "integrity": "sha512-dE2ibukxxkrde7wH9W8ozHKUO4aQnPZ6qBHtrTH9LoO836PjDdiaWO73fgPB05VfJs9FbZdmGPVEbXCeOP99Ww==",
                "requires": {
                "babel-runtime": "6.x",
                  "prop-types": "^15.5.8",
                  "rc-trigger": "^2.2.2"
              }
            },
            "rc-tree": {
              "version": "2.1.3",
                "resolved": "https://registry.npmjs.org/rc-tree/-/rc-tree-2.1.3.tgz",
                "integrity": "sha512-COvV65spQ6omrHBUhHRKqKNL5+ddXjlS+qWZchaL9FFuQNvjM5pjp9RnmMWK4fJJ5kBhhpLneh6wh9Vh3kSMXQ==",
                "requires": {
                "@ant-design/create-react-context": "^0.2.4",
                  "classnames": "2.x",
                  "prop-types": "^15.5.8",
                  "rc-animate": "^2.6.0",
                  "rc-util": "^4.5.1",
                  "react-lifecycles-compat": "^3.0.4",
                  "warning": "^4.0.3"
              }
            },
            "rc-tree-select": {
              "version": "2.9.4",
                "resolved": "https://registry.npmjs.org/rc-tree-select/-/rc-tree-select-2.9.4.tgz",
                "integrity": "sha512-0HQkXAN4XbfBW20CZYh3G+V+VMrjX42XRtDCpyv6PDUm5vikC0Ob682ZBCVS97Ww2a5Hf6Ajmu0ahWEdIEpwhg==",
                "requires": {
                "classnames": "^2.2.1",
                  "dom-scroll-into-view": "^1.2.1",
                  "prop-types": "^15.5.8",
                  "raf": "^3.4.0",
                  "rc-animate": "^2.8.2",
                  "rc-tree": "~2.1.0",
                  "rc-trigger": "^3.0.0",
                  "rc-util": "^4.5.0",
                  "react-lifecycles-compat": "^3.0.4",
                  "shallowequal": "^1.0.2",
                  "warning": "^4.0.1"
              },
              "dependencies": {
                "rc-trigger": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/rc-trigger/-/rc-trigger-3.0.0.tgz",
                    "integrity": "sha512-hQxbbJpo23E2QnYczfq3Ec5J5tVl2mUDhkqxrEsQAqk16HfADQg+iKNWzEYXyERSncdxfnzYuaBgy764mNRzTA==",
                    "requires": {
                    "babel-runtime": "6.x",
                      "classnames": "^2.2.6",
                      "prop-types": "15.x",
                      "raf": "^3.4.0",
                      "rc-align": "^2.4.1",
                      "rc-animate": "^3.0.0-rc.1",
                      "rc-util": "^4.15.7"
                  },
                  "dependencies": {
                    "rc-animate": {
                      "version": "3.0.0-rc.6",
                        "resolved": "https://registry.npmjs.org/rc-animate/-/rc-animate-3.0.0-rc.6.tgz",
                        "integrity": "sha512-oBLPpiT6Q4t6YvD/pkLcmofBP1p01TX0Otse8Q4+Mxt8J+VSDflLZGIgf62EwkvRwsQUkLPjZVFBsldnPKLzjg==",
                        "requires": {
                        "babel-runtime": "6.x",
                          "classnames": "^2.2.5",
                          "component-classes": "^1.2.6",
                          "fbjs": "^0.8.16",
                          "prop-types": "15.x",
                          "raf": "^3.4.0",
                          "rc-util": "^4.5.0",
                          "react-lifecycles-compat": "^3.0.4"
                      }
                    }
                  }
                }
              }
            },
            "rc-trigger": {
              "version": "2.6.5",
                "resolved": "https://registry.npmjs.org/rc-trigger/-/rc-trigger-2.6.5.tgz",
                "integrity": "sha512-m6Cts9hLeZWsTvWnuMm7oElhf+03GOjOLfTuU0QmdB9ZrW7jR2IpI5rpNM7i9MvAAlMAmTx5Zr7g3uu/aMvZAw==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.6",
                  "prop-types": "15.x",
                  "rc-align": "^2.4.0",
                  "rc-animate": "2.x",
                  "rc-util": "^4.4.0",
                  "react-lifecycles-compat": "^3.0.4"
              }
            },
            "rc-upload": {
              "version": "2.6.8",
                "resolved": "https://registry.npmjs.org/rc-upload/-/rc-upload-2.6.8.tgz",
                "integrity": "sha512-Uz7hys+FdIfS8qIm+VnCUZ21sY+/VaCjyMKw6cANmgBIbemFNOxEPEfgEBZH1YHt89HCGNPSpIK976ndsuc2YQ==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.5",
                  "prop-types": "^15.5.7",
                  "warning": "4.x"
              }
            },
            "rc-util": {
              "version": "4.18.1",
                "resolved": "https://registry.npmjs.org/rc-util/-/rc-util-4.18.1.tgz",
                "integrity": "sha512-3aRHG32ZvqBymtJUGoQnbZS+XANzO6XTiFEFAYI3BfuxESEazopAy0kBwcAI6BlLHsW1oLiy3ysE9uYwylh2ag==",
                "requires": {
                "add-dom-event-listener": "^1.1.0",
                  "babel-runtime": "6.x",
                  "prop-types": "^15.5.10",
                  "react-lifecycles-compat": "^3.0.4",
                  "shallowequal": "^1.1.0"
              }
            },
            "react": {
              "version": "16.8.6",
                "resolved": "https://registry.npmjs.org/react/-/react-16.8.6.tgz",
                "integrity": "sha512-pC0uMkhLaHm11ZSJULfOBqV4tIZkx87ZLvbbQYunNixAAvjnC+snJCg0XQXn9VIsttVsbZP/H/ewzgsd5fxKXw==",
                "requires": {
                "loose-envify": "^1.1.0",
                  "object-assign": "^4.1.1",
                  "prop-types": "^15.6.2",
                  "scheduler": "^0.13.6"
              }
            },
            "react-add-to-calendar": {
              "version": "0.1.5",
                "resolved": "https://registry.npmjs.org/react-add-to-calendar/-/react-add-to-calendar-0.1.5.tgz",
                "integrity": "sha512-DI+q3vvHCiYhxgh+83sg9UrPD9sdyBYcuY77UMcfX3y1MUPMW+f/w/6EG0MZg7B07vLQ4R6nxqk6wtMtcXOicA==",
                "requires": {
                "moment": "^2.18.1"
              }
            },
            "react-app-polyfill": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/react-app-polyfill/-/react-app-polyfill-1.0.1.tgz",
                "integrity": "sha512-LbVpT1NdzTdDDs7xEZdebjDrqsvKi5UyVKUQqtTYYNyC1JJYVAwNQWe4ybWvoT2V2WW9PGVO2u5Y6aVj4ER/Ow==",
                "requires": {
                "core-js": "3.0.1",
                  "object-assign": "4.1.1",
                  "promise": "8.0.2",
                  "raf": "3.4.1",
                  "regenerator-runtime": "0.13.2",
                  "whatwg-fetch": "3.0.0"
              },
              "dependencies": {
                "core-js": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.0.1.tgz",
                    "integrity": "sha512-sco40rF+2KlE0ROMvydjkrVMMG1vYilP2ALoRXcYR4obqbYIuV3Bg+51GEDW+HF8n7NRA+iaA4qD0nD9lo9mew=="
                },
                "promise": {
                  "version": "8.0.2",
                    "resolved": "https://registry.npmjs.org/promise/-/promise-8.0.2.tgz",
                    "integrity": "sha512-EIyzM39FpVOMbqgzEHhxdrEhtOSDOtjMZQ0M6iVfCE+kWNgCkAyOdnuCWqfmflylftfadU6FkiMgHZA2kUzwRw==",
                    "requires": {
                    "asap": "~2.0.6"
                  }
                },
                "regenerator-runtime": {
                  "version": "0.13.2",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.2.tgz",
                    "integrity": "sha512-S/TQAZJO+D3m9xeN1WTI8dLKBBiRgXBlTJvbWjCThHWZj9EvHK70Ff50/tYj2J/fvBY6JtFVwRuazHN2E7M9BA=="
                }
              }
            },
            "react-copy-to-clipboard": {
              "version": "5.0.2",
                "resolved": "https://registry.npmjs.org/react-copy-to-clipboard/-/react-copy-to-clipboard-5.0.2.tgz",
                "integrity": "sha512-/2t5mLMMPuN5GmdXo6TebFa8IoFxZ+KTDDqYhcDm0PhkgEzSxVvIX26G20s1EB02A4h2UZgwtfymZ3lGJm0OLg==",
                "requires": {
                "copy-to-clipboard": "^3",
                  "prop-types": "^15.5.8"
              }
            },
            "react-dev-utils": {
              "version": "10.0.0",
                "resolved": "https://registry.npmjs.org/react-dev-utils/-/react-dev-utils-10.0.0.tgz",
                "integrity": "sha512-8OKSJvl8ccXJDNf0YGw377L9v1OnT16skD/EuZWm0M/yr255etP4x4kuUCT1EfFfJ7Rhc4ZTpPTfPrvgiXa50Q==",
                "requires": {
                "@babel/code-frame": "7.5.5",
                  "address": "1.1.2",
                  "browserslist": "4.7.3",
                  "chalk": "2.4.2",
                  "cross-spawn": "6.0.5",
                  "detect-port-alt": "1.1.6",
                  "escape-string-regexp": "1.0.5",
                  "filesize": "3.6.1",
                  "find-up": "3.0.0",
                  "fork-ts-checker-webpack-plugin": "3.1.0",
                  "global-modules": "2.0.0",
                  "globby": "8.0.2",
                  "gzip-size": "5.1.1",
                  "immer": "1.10.0",
                  "inquirer": "6.5.0",
                  "is-root": "2.1.0",
                  "loader-utils": "1.2.3",
                  "open": "^7.0.0",
                  "pkg-up": "2.0.0",
                  "react-error-overlay": "^6.0.4",
                  "recursive-readdir": "2.2.2",
                  "shell-quote": "1.7.2",
                  "strip-ansi": "5.2.0",
                  "text-table": "0.2.0"
              },
              "dependencies": {
                "@babel/code-frame": {
                  "version": "7.5.5",
                    "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.5.5.tgz",
                    "integrity": "sha512-27d4lZoomVyo51VegxI20xZPuSHusqbQag/ztrBC7wegWoQ1nLREPVSKSW8byhTlzTKyNE4ifaTA6lCp7JjpFw==",
                    "requires": {
                    "@babel/highlight": "^7.0.0"
                  }
                },
                "ansi-escapes": {
                  "version": "3.2.0",
                    "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-3.2.0.tgz",
                    "integrity": "sha512-cBhpre4ma+U0T1oM5fXg7Dy1Jw7zzwv7lt/GoCpr+hDQJoYnKVPLL4dCvSEFMmQurOQvSrwT7SL/DAlhBI97RQ=="
                },
                "browserslist": {
                  "version": "4.7.3",
                    "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.7.3.tgz",
                    "integrity": "sha512-jWvmhqYpx+9EZm/FxcZSbUZyDEvDTLDi3nSAKbzEkyWvtI0mNSmUosey+5awDW1RUlrgXbQb5A6qY1xQH9U6MQ==",
                    "requires": {
                    "caniuse-lite": "^1.0.30001010",
                      "electron-to-chromium": "^1.3.306",
                      "node-releases": "^1.1.40"
                  }
                },
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  }
                },
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                },
                "inquirer": {
                  "version": "6.5.0",
                    "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-6.5.0.tgz",
                    "integrity": "sha512-scfHejeG/lVZSpvCXpsB4j/wQNPM5JC8kiElOI0OUTwmc1RTpXr4H32/HOlQHcZiYl2z2VElwuCVDRG8vFmbnA==",
                    "requires": {
                    "ansi-escapes": "^3.2.0",
                      "chalk": "^2.4.2",
                      "cli-cursor": "^2.1.0",
                      "cli-width": "^2.0.0",
                      "external-editor": "^3.0.3",
                      "figures": "^2.0.0",
                      "lodash": "^4.17.12",
                      "mute-stream": "0.0.7",
                      "run-async": "^2.2.0",
                      "rxjs": "^6.4.0",
                      "string-width": "^2.1.0",
                      "strip-ansi": "^5.1.0",
                      "through": "^2.3.6"
                  }
                }
              }
            },
            "react-dom": {
              "version": "16.8.6",
                "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-16.8.6.tgz",
                "integrity": "sha512-1nL7PIq9LTL3fthPqwkvr2zY7phIPjYrT0jp4HjyEQrEROnw4dG41VVwi/wfoCneoleqrNX7iAD+pXebJZwrwA==",
                "requires": {
                "loose-envify": "^1.1.0",
                  "object-assign": "^4.1.1",
                  "prop-types": "^15.6.2",
                  "scheduler": "^0.13.6"
              }
            },
            "react-error-overlay": {
              "version": "6.0.4",
                "resolved": "https://registry.npmjs.org/react-error-overlay/-/react-error-overlay-6.0.4.tgz",
                "integrity": "sha512-ueZzLmHltszTshDMwyfELDq8zOA803wQ1ZuzCccXa1m57k1PxSHfflPD5W9YIiTXLs0JTLzoj6o1LuM5N6zzNA=="
            },
            "react-geocode": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/react-geocode/-/react-geocode-0.2.0.tgz",
                "integrity": "sha512-H01XfycAkI5J/gV52OfA8JVaQ0Cx354MktjoYzke1JtDboGch6m4SgnY+S9ipUm+H6++4sCzHTxTLf9ANzbCqw=="
            },
            "react-icons": {
              "version": "3.7.0",
                "resolved": "https://registry.npmjs.org/react-icons/-/react-icons-3.7.0.tgz",
                "integrity": "sha512-7MyPwjIhuyW0D2N3s4DEd0hGPGFf0sK+IIRKhc1FvSpZNVmnUoGvHbmAwzGJU+3my+fvihVWgwU5SDtlAri56Q==",
                "requires": {
                "camelcase": "^5.0.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                }
              }
            },
            "react-iframe": {
              "version": "1.8.0",
                "resolved": "https://registry.npmjs.org/react-iframe/-/react-iframe-1.8.0.tgz",
                "integrity": "sha512-NYi89+rEqREwQxW9sDf+akh6/dtwWd3bOjByoVEIQ7SicOxVawRMer3pLdWjFaHXpuxTB9NqobPf/Ohj2iAKkg==",
                "requires": {
                "object-assign": "^4.1.1"
              }
            },
            "react-input-mask": {
              "version": "2.0.4",
                "resolved": "https://registry.npmjs.org/react-input-mask/-/react-input-mask-2.0.4.tgz",
                "integrity": "sha512-1hwzMr/aO9tXfiroiVCx5EtKohKwLk/NT8QlJXHQ4N+yJJFyUuMT+zfTpLBwX/lK3PkuMlievIffncpMZ3HGRQ==",
                "requires": {
                "invariant": "^2.2.4",
                  "warning": "^4.0.2"
              }
            },
            "react-is": {
              "version": "16.12.0",
                "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.12.0.tgz",
                "integrity": "sha512-rPCkf/mWBtKc97aLL9/txD8DZdemK0vkA3JMLShjlJB3Pj3s+lpf1KaBzMfQrAmhMQB0n1cU/SUGgKKBCe837Q=="
            },
            "react-lazy-load": {
              "version": "3.0.13",
                "resolved": "https://registry.npmjs.org/react-lazy-load/-/react-lazy-load-3.0.13.tgz",
                "integrity": "sha1-OwqS0zbUPT8Nc8vm81sXBQsIuCQ=",
                "requires": {
                "eventlistener": "0.0.1",
                  "lodash.debounce": "^4.0.0",
                  "lodash.throttle": "^4.0.0",
                  "prop-types": "^15.5.8"
              }
            },
            "react-lifecycles-compat": {
              "version": "3.0.4",
                "resolved": "https://registry.npmjs.org/react-lifecycles-compat/-/react-lifecycles-compat-3.0.4.tgz",
                "integrity": "sha512-fBASbA6LnOU9dOU2eW7aQ8xmYBSXUIWr+UmF9b1efZBazGNO+rcXT/icdKnYm2pTwcRylVUYwW7H1PHfLekVzA=="
            },
            "react-redux": {
              "version": "7.0.3",
                "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-7.0.3.tgz",
                "integrity": "sha512-vYZA7ftOYlDk3NetitsI7fLjryt/widNl1SLXYvFenIpm7vjb4ryK0EeFrgn62usg5fYkyIAWNUPKnwWPevKLg==",
                "requires": {
                "@babel/runtime": "^7.4.3",
                  "hoist-non-react-statics": "^3.3.0",
                  "invariant": "^2.2.4",
                  "loose-envify": "^1.4.0",
                  "prop-types": "^15.7.2",
                  "react-is": "^16.8.6"
              }
            },
            "react-router": {
              "version": "5.0.0",
                "resolved": "https://registry.npmjs.org/react-router/-/react-router-5.0.0.tgz",
                "integrity": "sha512-6EQDakGdLG/it2x9EaCt9ZpEEPxnd0OCLBHQ1AcITAAx7nCnyvnzf76jKWG1s2/oJ7SSviUgfWHofdYljFexsA==",
                "requires": {
                "@babel/runtime": "^7.1.2",
                  "create-react-context": "^0.2.2",
                  "history": "^4.9.0",
                  "hoist-non-react-statics": "^3.1.0",
                  "loose-envify": "^1.3.1",
                  "path-to-regexp": "^1.7.0",
                  "prop-types": "^15.6.2",
                  "react-is": "^16.6.0",
                  "tiny-invariant": "^1.0.2",
                  "tiny-warning": "^1.0.0"
              }
            },
            "react-router-dom": {
              "version": "5.0.0",
                "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-5.0.0.tgz",
                "integrity": "sha512-wSpja5g9kh5dIteZT3tUoggjnsa+TPFHSMrpHXMpFsaHhQkm/JNVGh2jiF9Dkh4+duj4MKCkwO6H08u6inZYgQ==",
                "requires": {
                "@babel/runtime": "^7.1.2",
                  "history": "^4.9.0",
                  "loose-envify": "^1.3.1",
                  "prop-types": "^15.6.2",
                  "react-router": "5.0.0",
                  "tiny-invariant": "^1.0.2",
                  "tiny-warning": "^1.0.0"
              }
            },
            "react-scripts": {
              "version": "3.3.0",
                "resolved": "https://registry.npmjs.org/react-scripts/-/react-scripts-3.3.0.tgz",
                "integrity": "sha512-hzPc6bxCc9GnsspWqk494c2Gpd0dRbk/C8q76BNQIENi9GMwoxFljOEcZoZcpFpJgQ45alxFR6QaLt+51qie7g==",
                "requires": {
                "@babel/core": "7.7.4",
                  "@svgr/webpack": "4.3.3",
                  "@typescript-eslint/eslint-plugin": "^2.8.0",
                  "@typescript-eslint/parser": "^2.8.0",
                  "babel-eslint": "10.0.3",
                  "babel-jest": "^24.9.0",
                  "babel-loader": "8.0.6",
                  "babel-plugin-named-asset-import": "^0.3.5",
                  "babel-preset-react-app": "^9.1.0",
                  "camelcase": "^5.3.1",
                  "case-sensitive-paths-webpack-plugin": "2.2.0",
                  "css-loader": "3.2.0",
                  "dotenv": "8.2.0",
                  "dotenv-expand": "5.1.0",
                  "eslint": "^6.6.0",
                  "eslint-config-react-app": "^5.1.0",
                  "eslint-loader": "3.0.2",
                  "eslint-plugin-flowtype": "3.13.0",
                  "eslint-plugin-import": "2.18.2",
                  "eslint-plugin-jsx-a11y": "6.2.3",
                  "eslint-plugin-react": "7.16.0",
                  "eslint-plugin-react-hooks": "^1.6.1",
                  "file-loader": "4.3.0",
                  "fs-extra": "^8.1.0",
                  "fsevents": "2.1.2",
                  "html-webpack-plugin": "4.0.0-beta.5",
                  "identity-obj-proxy": "3.0.0",
                  "jest": "24.9.0",
                  "jest-environment-jsdom-fourteen": "0.1.0",
                  "jest-resolve": "24.9.0",
                  "jest-watch-typeahead": "0.4.2",
                  "mini-css-extract-plugin": "0.8.0",
                  "optimize-css-assets-webpack-plugin": "5.0.3",
                  "pnp-webpack-plugin": "1.5.0",
                  "postcss-flexbugs-fixes": "4.1.0",
                  "postcss-loader": "3.0.0",
                  "postcss-normalize": "8.0.1",
                  "postcss-preset-env": "6.7.0",
                  "postcss-safe-parser": "4.0.1",
                  "react-app-polyfill": "^1.0.5",
                  "react-dev-utils": "^10.0.0",
                  "resolve": "1.12.2",
                  "resolve-url-loader": "3.1.1",
                  "sass-loader": "8.0.0",
                  "semver": "6.3.0",
                  "style-loader": "1.0.0",
                  "terser-webpack-plugin": "2.2.1",
                  "ts-pnp": "1.1.5",
                  "url-loader": "2.3.0",
                  "webpack": "4.41.2",
                  "webpack-dev-server": "3.9.0",
                  "webpack-manifest-plugin": "2.2.0",
                  "workbox-webpack-plugin": "4.3.1"
              },
              "dependencies": {
                "acorn": {
                  "version": "7.1.0",
                    "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.1.0.tgz",
                    "integrity": "sha512-kL5CuoXA/dgxlBbVrflsflzQ3PAas7RYZB52NOm/6839iVYJgKMJ3cQJD+t2i5+qFa8h3MDpEOJiS64E8JLnSQ=="
                },
                "acorn-jsx": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.1.0.tgz",
                    "integrity": "sha512-tMUqwBWfLFbJbizRmEcWSLw6HnFzfdJs2sOJEOwwtVPMoH/0Ay+E703oZz78VSXZiiDcZrQ5XKjPIUQixhmgVw=="
                },
                "ansi-escapes": {
                  "version": "4.3.0",
                    "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.0.tgz",
                    "integrity": "sha512-EiYhwo0v255HUL6eDyuLrXEkTi7WwVCLAw+SeOQ7M7qdun1z1pum4DEm/nuqIVbPvi9RPPc9k9LbyBv6H0DwVg==",
                    "requires": {
                    "type-fest": "^0.8.1"
                  }
                },
                "ansi-regex": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
                    "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg=="
                },
                "babel-eslint": {
                  "version": "10.0.3",
                    "resolved": "https://registry.npmjs.org/babel-eslint/-/babel-eslint-10.0.3.tgz",
                    "integrity": "sha512-z3U7eMY6r/3f3/JB9mTsLjyxrv0Yb1zb8PCWCLpguxfCzBIZUwy23R1t/XKewP+8mEN2Ck8Dtr4q20z6ce6SoA==",
                    "requires": {
                    "@babel/code-frame": "^7.0.0",
                      "@babel/parser": "^7.0.0",
                      "@babel/traverse": "^7.0.0",
                      "@babel/types": "^7.0.0",
                      "eslint-visitor-keys": "^1.0.0",
                      "resolve": "^1.12.0"
                  }
                },
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "cli-cursor": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz",
                    "integrity": "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==",
                    "requires": {
                    "restore-cursor": "^3.1.0"
                  }
                },
                "core-js": {
                  "version": "3.6.3",
                    "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.6.3.tgz",
                    "integrity": "sha512-DOO9b18YHR+Wk5kJ/c5YFbXuUETreD4TrvXb6edzqZE3aAEd0eJIAWghZ9HttMuiON8SVCnU3fqA4rPxRDD1HQ=="
                },
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "doctrine": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
                    "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
                    "requires": {
                    "esutils": "^2.0.2"
                  }
                },
                "eslint": {
                  "version": "6.8.0",
                    "resolved": "https://registry.npmjs.org/eslint/-/eslint-6.8.0.tgz",
                    "integrity": "sha512-K+Iayyo2LtyYhDSYwz5D5QdWw0hCacNzyq1Y821Xna2xSJj7cijoLLYmLxTQgcgZ9mC61nryMy9S7GRbYpI5Ig==",
                    "requires": {
                    "@babel/code-frame": "^7.0.0",
                      "ajv": "^6.10.0",
                      "chalk": "^2.1.0",
                      "cross-spawn": "^6.0.5",
                      "debug": "^4.0.1",
                      "doctrine": "^3.0.0",
                      "eslint-scope": "^5.0.0",
                      "eslint-utils": "^1.4.3",
                      "eslint-visitor-keys": "^1.1.0",
                      "espree": "^6.1.2",
                      "esquery": "^1.0.1",
                      "esutils": "^2.0.2",
                      "file-entry-cache": "^5.0.1",
                      "functional-red-black-tree": "^1.0.1",
                      "glob-parent": "^5.0.0",
                      "globals": "^12.1.0",
                      "ignore": "^4.0.6",
                      "import-fresh": "^3.0.0",
                      "imurmurhash": "^0.1.4",
                      "inquirer": "^7.0.0",
                      "is-glob": "^4.0.0",
                      "js-yaml": "^3.13.1",
                      "json-stable-stringify-without-jsonify": "^1.0.1",
                      "levn": "^0.3.0",
                      "lodash": "^4.17.14",
                      "minimatch": "^3.0.4",
                      "mkdirp": "^0.5.1",
                      "natural-compare": "^1.4.0",
                      "optionator": "^0.8.3",
                      "progress": "^2.0.0",
                      "regexpp": "^2.0.1",
                      "semver": "^6.1.2",
                      "strip-ansi": "^5.2.0",
                      "strip-json-comments": "^3.0.1",
                      "table": "^5.2.3",
                      "text-table": "^0.2.0",
                      "v8-compile-cache": "^2.0.3"
                  },
                  "dependencies": {
                    "eslint-visitor-keys": {
                      "version": "1.1.0",
                        "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                        "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                    }
                  }
                },
                "eslint-plugin-import": {
                  "version": "2.18.2",
                    "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.18.2.tgz",
                    "integrity": "sha512-5ohpsHAiUBRNaBWAF08izwUGlbrJoJJ+W9/TBwsGoR1MnlgfwMIKrFeSjWbt6moabiXW9xNvtFz+97KHRfI4HQ==",
                    "requires": {
                    "array-includes": "^3.0.3",
                      "contains-path": "^0.1.0",
                      "debug": "^2.6.9",
                      "doctrine": "1.5.0",
                      "eslint-import-resolver-node": "^0.3.2",
                      "eslint-module-utils": "^2.4.0",
                      "has": "^1.0.3",
                      "minimatch": "^3.0.4",
                      "object.values": "^1.1.0",
                      "read-pkg-up": "^2.0.0",
                      "resolve": "^1.11.0"
                  },
                  "dependencies": {
                    "debug": {
                      "version": "2.6.9",
                        "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
                        "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
                        "requires": {
                        "ms": "2.0.0"
                      }
                    },
                    "doctrine": {
                      "version": "1.5.0",
                        "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
                        "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
                        "requires": {
                        "esutils": "^2.0.2",
                          "isarray": "^1.0.0"
                      }
                    },
                    "ms": {
                      "version": "2.0.0",
                        "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
                        "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
                    }
                  }
                },
                "eslint-scope": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-5.0.0.tgz",
                    "integrity": "sha512-oYrhJW7S0bxAFDvWqzvMPRm6pcgcnWc4QnofCAqRTRfQC0JcwenzGglTtsLyIuuWFfkqDG9vz67cnttSd53djw==",
                    "requires": {
                    "esrecurse": "^4.1.0",
                      "estraverse": "^4.1.1"
                  }
                },
                "eslint-utils": {
                  "version": "1.4.3",
                    "resolved": "https://registry.npmjs.org/eslint-utils/-/eslint-utils-1.4.3.tgz",
                    "integrity": "sha512-fbBN5W2xdY45KulGXmLHZ3c3FHfVYmKg0IrAKGOkT/464PQsx2UeIzfz1RmEci+KLm1bBaAzZAh8+/E+XAeZ8Q==",
                    "requires": {
                    "eslint-visitor-keys": "^1.1.0"
                  },
                  "dependencies": {
                    "eslint-visitor-keys": {
                      "version": "1.1.0",
                        "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                        "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                    }
                  }
                },
                "espree": {
                  "version": "6.1.2",
                    "resolved": "https://registry.npmjs.org/espree/-/espree-6.1.2.tgz",
                    "integrity": "sha512-2iUPuuPP+yW1PZaMSDM9eyVf8D5P0Hi8h83YtZ5bPc/zHYjII5khoixIUTMO794NOY8F/ThF1Bo8ncZILarUTA==",
                    "requires": {
                    "acorn": "^7.1.0",
                      "acorn-jsx": "^5.1.0",
                      "eslint-visitor-keys": "^1.1.0"
                  },
                  "dependencies": {
                    "eslint-visitor-keys": {
                      "version": "1.1.0",
                        "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-1.1.0.tgz",
                        "integrity": "sha512-8y9YjtM1JBJU/A9Kc+SbaOV4y29sSWckBwMHa+FGtVj5gN/sbnKDf6xJUl+8g7FAij9LVaP8C24DUiH/f/2Z9A=="
                    }
                  }
                },
                "figures": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/figures/-/figures-3.1.0.tgz",
                    "integrity": "sha512-ravh8VRXqHuMvZt/d8GblBeqDMkdJMBdv/2KntFH+ra5MXkO7nxNKpzQ3n6QD/2da1kH0aWmNISdvhM7gl2gVg==",
                    "requires": {
                    "escape-string-regexp": "^1.0.5"
                  }
                },
                "globals": {
                  "version": "12.3.0",
                    "resolved": "https://registry.npmjs.org/globals/-/globals-12.3.0.tgz",
                    "integrity": "sha512-wAfjdLgFsPZsklLJvOBUBmzYE8/CwhEqSBEMRXA3qxIiNtyqvjYurAtIfDh6chlEPUfmTY3MnZh5Hfh4q0UlIw==",
                    "requires": {
                    "type-fest": "^0.8.1"
                  }
                },
                "import-fresh": {
                  "version": "3.2.1",
                    "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.2.1.tgz",
                    "integrity": "sha512-6e1q1cnWP2RXD9/keSkxHScg508CdXqXWgWBaETNhyuBFz+kUZlKboh+ISK+bU++DmbHimVBrOz/zzPe0sZ3sQ==",
                    "requires": {
                    "parent-module": "^1.0.0",
                      "resolve-from": "^4.0.0"
                  }
                },
                "inquirer": {
                  "version": "7.0.3",
                    "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-7.0.3.tgz",
                    "integrity": "sha512-+OiOVeVydu4hnCGLCSX+wedovR/Yzskv9BFqUNNKq9uU2qg7LCcCo3R86S2E7WLo0y/x2pnEZfZe1CoYnORUAw==",
                    "requires": {
                    "ansi-escapes": "^4.2.1",
                      "chalk": "^2.4.2",
                      "cli-cursor": "^3.1.0",
                      "cli-width": "^2.0.0",
                      "external-editor": "^3.0.3",
                      "figures": "^3.0.0",
                      "lodash": "^4.17.15",
                      "mute-stream": "0.0.8",
                      "run-async": "^2.2.0",
                      "rxjs": "^6.5.3",
                      "string-width": "^4.1.0",
                      "strip-ansi": "^5.1.0",
                      "through": "^2.3.6"
                  },
                  "dependencies": {
                    "chalk": {
                      "version": "2.4.2",
                        "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                        "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                        "requires": {
                        "ansi-styles": "^3.2.1",
                          "escape-string-regexp": "^1.0.5",
                          "supports-color": "^5.3.0"
                      }
                    }
                  }
                },
                "is-extglob": {
                  "version": "2.1.1",
                    "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
                    "integrity": "sha1-qIwCU1eR8C7TfHahueqXc8gz+MI="
                },
                "is-fullwidth-code-point": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
                    "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="
                },
                "is-glob": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.1.tgz",
                    "integrity": "sha512-5G0tKtBTFImOqDnLB2hG6Bp2qcKEFduo4tZu9MT/H6NQv/ghhy30o55ufafxJ/LdH79LLs2Kfrn85TLKyA7BUg==",
                    "requires": {
                    "is-extglob": "^2.1.1"
                  }
                },
                "mimic-fn": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
                    "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg=="
                },
                "mute-stream": {
                  "version": "0.0.8",
                    "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.8.tgz",
                    "integrity": "sha512-nnbWWOkoWyUsTjKrhgD0dcz22mdkSnpYqbEjIm2nhwhuxlSkpywJmBo8h0ZqJdkp73mb90SssHkN4rsRaBAfAA=="
                },
                "onetime": {
                  "version": "5.1.0",
                    "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.0.tgz",
                    "integrity": "sha512-5NcSkPHhwTVFIQN+TUqXoS5+dlElHXdpAWu9I0HP20YOtIi+aZ0Ct82jdlILDxjLEAWwvm+qj1m6aEtsDVmm6Q==",
                    "requires": {
                    "mimic-fn": "^2.1.0"
                  }
                },
                "optionator": {
                  "version": "0.8.3",
                    "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
                    "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
                    "requires": {
                    "deep-is": "~0.1.3",
                      "fast-levenshtein": "~2.0.6",
                      "levn": "~0.3.0",
                      "prelude-ls": "~1.1.2",
                      "type-check": "~0.3.2",
                      "word-wrap": "~1.2.3"
                  }
                },
                "promise": {
                  "version": "8.0.3",
                    "resolved": "https://registry.npmjs.org/promise/-/promise-8.0.3.tgz",
                    "integrity": "sha512-HeRDUL1RJiLhyA0/grn+PTShlBAcLuh/1BJGtrvjwbvRDCTLLMEz9rOGCV+R3vHY4MixIuoMEd9Yq/XvsTPcjw==",
                    "requires": {
                    "asap": "~2.0.6"
                  }
                },
                "react-app-polyfill": {
                  "version": "1.0.5",
                    "resolved": "https://registry.npmjs.org/react-app-polyfill/-/react-app-polyfill-1.0.5.tgz",
                    "integrity": "sha512-RcbV6+msbvZJZUIK/LX3UafPtoaDSJgUWu4sqBxHKTVmBsnlU2QWCKJRBRmgjxu+ivW/GPINbPWRM4Ppa6Lbgw==",
                    "requires": {
                    "core-js": "^3.4.1",
                      "object-assign": "^4.1.1",
                      "promise": "^8.0.3",
                      "raf": "^3.4.1",
                      "regenerator-runtime": "^0.13.3",
                      "whatwg-fetch": "^3.0.0"
                  }
                },
                "regenerator-runtime": {
                  "version": "0.13.3",
                    "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.3.tgz",
                    "integrity": "sha512-naKIZz2GQ8JWh///G7L3X6LaQUAMp2lvb1rvwwsURe/VXwD6VMfr+/1NuNw3ag8v2kY1aQ/go5SNn79O9JU7yw=="
                },
                "resolve": {
                  "version": "1.12.2",
                    "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.12.2.tgz",
                    "integrity": "sha512-cAVTI2VLHWYsGOirfeYVVQ7ZDejtQ9fp4YhYckWDEkFfqbVjaT11iM8k6xSAfGFMM+gDpZjMnFssPu8we+mqFw==",
                    "requires": {
                    "path-parse": "^1.0.6"
                  }
                },
                "resolve-from": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
                    "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="
                },
                "restore-cursor": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-3.1.0.tgz",
                    "integrity": "sha512-l+sSefzHpj5qimhFSE5a8nufZYAM3sBSVMAPtYkmC+4EH2anSGaEMXSD0izRQbu9nfyQ9y5JrVmp7E8oZrUjvA==",
                    "requires": {
                    "onetime": "^5.1.0",
                      "signal-exit": "^3.0.2"
                  }
                },
                "rxjs": {
                  "version": "6.5.4",
                    "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.4.tgz",
                    "integrity": "sha512-naMQXcgEo3csAEGvw/NydRA0fuS2nDZJiw1YUWFKU7aPPAPGZEsD4Iimit96qwCieH6y614MCLYwdkrWx7z/7Q==",
                    "requires": {
                    "tslib": "^1.9.0"
                  }
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                },
                "string-width": {
                  "version": "4.2.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.0.tgz",
                    "integrity": "sha512-zUz5JD+tgqtuDjMhwIg5uFVV3dtqZ9yQJlZVfq4I01/K5Paj5UHj7VyrQOJvzawSVlKpObApbfD0Ed6yJc+1eg==",
                    "requires": {
                    "emoji-regex": "^8.0.0",
                      "is-fullwidth-code-point": "^3.0.0",
                      "strip-ansi": "^6.0.0"
                  },
                  "dependencies": {
                    "strip-ansi": {
                      "version": "6.0.0",
                        "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
                        "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
                        "requires": {
                        "ansi-regex": "^5.0.0"
                      }
                    }
                  }
                },
                "strip-json-comments": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.0.1.tgz",
                    "integrity": "sha512-VTyMAUfdm047mwKl+u79WIdrZxtFtn+nBxHeb844XBQ9uMNTuTHdx2hc5RiAJYqwTj3wc/xe5HLSdJSkJ+WfZw=="
                }
              }
            },
            "react-slick": {
              "version": "0.24.0",
                "resolved": "https://registry.npmjs.org/react-slick/-/react-slick-0.24.0.tgz",
                "integrity": "sha512-Pvo0B74ohumQdYOf0qP+pdQpj9iUbAav7+2qiF3uTc5XeQp/Y/cnIeDBM2tB3txthfSe05jKIqLMJTS6qVvt5g==",
                "requires": {
                "classnames": "^2.2.5",
                  "enquire.js": "^2.1.6",
                  "json2mq": "^0.2.0",
                  "lodash.debounce": "^4.0.8",
                  "resize-observer-polyfill": "^1.5.0"
              }
            },
            "react-svg": {
              "version": "10.0.4",
                "resolved": "https://registry.npmjs.org/react-svg/-/react-svg-10.0.4.tgz",
                "integrity": "sha512-ZKY2NNAdm3C0nS/8TjVHVXULPyCBfYZ1weIdWFvRdFyIODuO6kAq8PMxPR5KuO6b9+YT3Jed5wVs9QkJTSOx0A==",
                "requires": {
                "@babel/runtime": "^7.4.5",
                  "@tanem/svg-injector": "^8.0.6",
                  "prop-types": "^15.7.2"
              }
            },
            "read-pkg": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-2.0.0.tgz",
                "integrity": "sha1-jvHAYjxqbbDcZxPEv6xGMysjaPg=",
                "requires": {
                "load-json-file": "^2.0.0",
                  "normalize-package-data": "^2.3.2",
                  "path-type": "^2.0.0"
              },
              "dependencies": {
                "load-json-file": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-2.0.0.tgz",
                    "integrity": "sha1-eUfkIUmvgNaWy/eXvKq8/h/inKg=",
                    "requires": {
                    "graceful-fs": "^4.1.2",
                      "parse-json": "^2.2.0",
                      "pify": "^2.0.0",
                      "strip-bom": "^3.0.0"
                  }
                },
                "parse-json": {
                  "version": "2.2.0",
                    "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
                    "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
                    "requires": {
                    "error-ex": "^1.2.0"
                  }
                },
                "path-type": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/path-type/-/path-type-2.0.0.tgz",
                    "integrity": "sha1-8BLMuEFbcJb8LaoQVMPXI4lZTHM=",
                    "requires": {
                    "pify": "^2.0.0"
                  }
                }
              }
            },
            "read-pkg-up": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-2.0.0.tgz",
                "integrity": "sha1-a3KoBImE4MQeeVEP1en6mbO1Sb4=",
                "requires": {
                "find-up": "^2.0.0",
                  "read-pkg": "^2.0.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-2.1.0.tgz",
                    "integrity": "sha1-RdG35QbHF93UgndaK3eSCjwMV6c=",
                    "requires": {
                    "locate-path": "^2.0.0"
                  }
                },
                "locate-path": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-2.0.0.tgz",
                    "integrity": "sha1-K1aLJl7slExtnA3pw9u7ygNUzY4=",
                    "requires": {
                    "p-locate": "^2.0.0",
                      "path-exists": "^3.0.0"
                  }
                },
                "p-limit": {
                  "version": "1.3.0",
                    "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-1.3.0.tgz",
                    "integrity": "sha512-vvcXsLAJ9Dr5rQOPk7toZQZJApBl2K4J6dANSsEuh6QI41JYcsS/qhTGa9ErIUUgK3WNQoJYvylxvjqmiqEA9Q==",
                    "requires": {
                    "p-try": "^1.0.0"
                  }
                },
                "p-locate": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-2.0.0.tgz",
                    "integrity": "sha1-IKAQOyIqcMj9OcwuWAaA893l7EM=",
                    "requires": {
                    "p-limit": "^1.1.0"
                  }
                },
                "p-try": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/p-try/-/p-try-1.0.0.tgz",
                    "integrity": "sha1-y8ec26+P1CKOE/Yh8rGiN8GyB7M="
                }
              }
            },
            "readable-stream": {
              "version": "2.3.6",
                "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-2.3.6.tgz",
                "integrity": "sha512-tQtKA9WIAhBF3+VLAseyMqZeBjW0AHJoxOtYqSUZNJxauErmLbVm2FW1y+J/YA9dUrAC39ITejlZWhVIwawkKw==",
                "requires": {
                "core-util-is": "~1.0.0",
                  "inherits": "~2.0.3",
                  "isarray": "~1.0.0",
                  "process-nextick-args": "~2.0.0",
                  "safe-buffer": "~5.1.1",
                  "string_decoder": "~1.1.1",
                  "util-deprecate": "~1.0.1"
              }
            },
            "readdirp": {
              "version": "2.2.1",
                "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-2.2.1.tgz",
                "integrity": "sha512-1JU/8q+VgFZyxwrJ+SVIOsh+KywWGpds3NTqikiKpDMZWScmAYyKIgqkO+ARvNWJfXeXR1zxz7aHF4u4CyH6vQ==",
                "requires": {
                "graceful-fs": "^4.1.11",
                  "micromatch": "^3.1.10",
                  "readable-stream": "^2.0.2"
              }
            },
            "realpath-native": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/realpath-native/-/realpath-native-1.1.0.tgz",
                "integrity": "sha512-wlgPA6cCIIg9gKz0fgAPjnzh4yR/LnXovwuo9hvyGvx3h8nX4+/iLZplfUWasXpqD8BdnGnP5njOFjkUwPzvjA==",
                "requires": {
                "util.promisify": "^1.0.0"
              }
            },
            "recursive-readdir": {
              "version": "2.2.2",
                "resolved": "https://registry.npmjs.org/recursive-readdir/-/recursive-readdir-2.2.2.tgz",
                "integrity": "sha512-nRCcW9Sj7NuZwa2XvH9co8NPeXUBhZP7CRKJtU+cS6PW9FpCIFoI5ib0NT1ZrbNuPoRy0ylyCaUL8Gih4LSyFg==",
                "requires": {
                "minimatch": "3.0.4"
              }
            },
            "redent": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/redent/-/redent-1.0.0.tgz",
                "integrity": "sha1-z5Fqsf1fHxbfsggi3W7H9zDCr94=",
                "requires": {
                "indent-string": "^2.1.0",
                  "strip-indent": "^1.0.1"
              }
            },
            "redux": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/redux/-/redux-4.0.1.tgz",
                "integrity": "sha512-R7bAtSkk7nY6O/OYMVR9RiBI+XghjF9rlbl5806HJbQph0LJVHZrU5oaO4q70eUKiqMRqm4y07KLTlMZ2BlVmg==",
                "requires": {
                "loose-envify": "^1.4.0",
                  "symbol-observable": "^1.2.0"
              }
            },
            "redux-devtools": {
              "version": "3.5.0",
                "resolved": "https://registry.npmjs.org/redux-devtools/-/redux-devtools-3.5.0.tgz",
                "integrity": "sha512-pGU8TZNvWxPaCCE432AGm6H6alQbAz80gQM5CzM3SjX9/oSNu/HPF17xFdPQJOXasqyih1Gv167kZDTRe7r0iQ==",
                "requires": {
                "lodash": "^4.2.0",
                  "prop-types": "^15.5.7",
                  "redux-devtools-instrument": "^1.9.0"
              }
            },
            "redux-devtools-extension": {
              "version": "2.13.8",
                "resolved": "https://registry.npmjs.org/redux-devtools-extension/-/redux-devtools-extension-2.13.8.tgz",
                "integrity": "sha512-8qlpooP2QqPtZHQZRhx3x3OP5skEV1py/zUdMY28WNAocbafxdG2tRD1MWE7sp8obGMNYuLWanhhQ7EQvT1FBg=="
            },
            "redux-devtools-instrument": {
              "version": "1.9.6",
                "resolved": "https://registry.npmjs.org/redux-devtools-instrument/-/redux-devtools-instrument-1.9.6.tgz",
                "integrity": "sha512-MwvY4cLEB2tIfWWBzrUR02UM9qRG2i7daNzywRvabOSVdvAY7s9BxSwMmVRH1Y/7QWjplNtOwgT0apKhHg2Qew==",
                "requires": {
                "lodash": "^4.2.0",
                  "symbol-observable": "^1.0.2"
              }
            },
            "redux-logger": {
              "version": "3.0.6",
                "resolved": "https://registry.npmjs.org/redux-logger/-/redux-logger-3.0.6.tgz",
                "integrity": "sha1-91VZZvMJjzyIYExEnPC69XeCdL8=",
                "requires": {
                "deep-diff": "^0.3.5"
              }
            },
            "redux-thunk": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-2.3.0.tgz",
                "integrity": "sha512-km6dclyFnmcvxhAcrQV2AkZmPQjzPDjgVlQtR0EQjxZPyJ0BnMf3in1ryuR8A2qU0HldVRfxYXbFSKlI3N7Slw=="
            },
            "regenerate": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/regenerate/-/regenerate-1.4.0.tgz",
                "integrity": "sha512-1G6jJVDWrt0rK99kBjvEtziZNCICAuvIPkSiUFIQxVP06RCVpq3dmDo2oi6ABpYaDYaTRr67BEhL8r1wgEZZKg=="
            },
            "regenerate-unicode-properties": {
              "version": "8.1.0",
                "resolved": "https://registry.npmjs.org/regenerate-unicode-properties/-/regenerate-unicode-properties-8.1.0.tgz",
                "integrity": "sha512-LGZzkgtLY79GeXLm8Dp0BVLdQlWICzBnJz/ipWUgo59qBaZ+BHtq51P2q1uVZlppMuUAT37SDk39qUbjTWB7bA==",
                "requires": {
                "regenerate": "^1.4.0"
              }
            },
            "regenerator-runtime": {
              "version": "0.11.1",
                "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.11.1.tgz",
                "integrity": "sha512-MguG95oij0fC3QV3URf4V2SDYGJhJnJGqvIIgdECeODCT98wSWDAJ94SSuVpYQUoTcGUIL6L4yNB7j1DFFHSBg=="
            },
            "regenerator-transform": {
              "version": "0.14.1",
                "resolved": "https://registry.npmjs.org/regenerator-transform/-/regenerator-transform-0.14.1.tgz",
                "integrity": "sha512-flVuee02C3FKRISbxhXl9mGzdbWUVHubl1SMaknjxkFB1/iqpJhArQUvRxOOPEc/9tAiX0BaQ28FJH10E4isSQ==",
                "requires": {
                "private": "^0.1.6"
              }
            },
            "regex-cache": {
              "version": "0.4.4",
                "resolved": "https://registry.npmjs.org/regex-cache/-/regex-cache-0.4.4.tgz",
                "integrity": "sha512-nVIZwtCjkC9YgvWkpM55B5rBhBYRZhAaJbgcFYXXsHnbZ9UZI9nnVWYZpBlCqv9ho2eZryPnWrZGsOdPwVWXWQ==",
                "dev": true,
                "optional": true,
                "requires": {
                "is-equal-shallow": "^0.1.3"
              }
            },
            "regex-not": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/regex-not/-/regex-not-1.0.2.tgz",
                "integrity": "sha512-J6SDjUgDxQj5NusnOtdFxDwN/+HWykR8GELwctJ7mdqhcyy1xEc4SRFHUXvxTp661YaVKAjfRLZ9cCqS6tn32A==",
                "requires": {
                "extend-shallow": "^3.0.2",
                  "safe-regex": "^1.1.0"
              }
            },
            "regex-parser": {
              "version": "2.2.10",
                "resolved": "https://registry.npmjs.org/regex-parser/-/regex-parser-2.2.10.tgz",
                "integrity": "sha512-8t6074A68gHfU8Neftl0Le6KTDwfGAj7IyjPIMSfikI2wJUTHDMaIq42bUsfVnj8mhx0R+45rdUXHGpN164avA=="
            },
            "regexp.prototype.flags": {
              "version": "1.3.0",
                "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.3.0.tgz",
                "integrity": "sha512-2+Q0C5g951OlYlJz6yu5/M33IcsESLlLfsyIaLJaG4FA2r4yP8MvVMJUUP/fVBkSpbbbZlS5gynbEWLipiiXiQ==",
                "requires": {
                "define-properties": "^1.1.3",
                  "es-abstract": "^1.17.0-next.1"
              },
              "dependencies": {
                "es-abstract": {
                  "version": "1.17.0",
                    "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.17.0.tgz",
                    "integrity": "sha512-yYkE07YF+6SIBmg1MsJ9dlub5L48Ek7X0qz+c/CPCHS9EBXfESorzng4cJQjJW5/pB6vDF41u7F8vUhLVDqIug==",
                    "requires": {
                    "es-to-primitive": "^1.2.1",
                      "function-bind": "^1.1.1",
                      "has": "^1.0.3",
                      "has-symbols": "^1.0.1",
                      "is-callable": "^1.1.5",
                      "is-regex": "^1.0.5",
                      "object-inspect": "^1.7.0",
                      "object-keys": "^1.1.1",
                      "object.assign": "^4.1.0",
                      "string.prototype.trimleft": "^2.1.1",
                      "string.prototype.trimright": "^2.1.1"
                  }
                },
                "has-symbols": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.1.tgz",
                    "integrity": "sha512-PLcsoqu++dmEIZB+6totNFKq/7Do+Z0u4oT0zKOJNl3lYK6vGwwu2hjHs+68OEZbTjiUE9bgOABXbP/GvrS0Kg=="
                },
                "object-keys": {
                  "version": "1.1.1",
                    "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
                    "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA=="
                }
              }
            },
            "regexpp": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/regexpp/-/regexpp-2.0.1.tgz",
                "integrity": "sha512-lv0M6+TkDVniA3aD1Eg0DVpfU/booSu7Eev3TDO/mZKHBfVjgCGTV4t4buppESEYDtkArYFOxTJWv6S5C+iaNw=="
            },
            "regexpu-core": {
              "version": "4.6.0",
                "resolved": "https://registry.npmjs.org/regexpu-core/-/regexpu-core-4.6.0.tgz",
                "integrity": "sha512-YlVaefl8P5BnFYOITTNzDvan1ulLOiXJzCNZxduTIosN17b87h3bvG9yHMoHaRuo88H4mQ06Aodj5VtYGGGiTg==",
                "requires": {
                "regenerate": "^1.4.0",
                  "regenerate-unicode-properties": "^8.1.0",
                  "regjsgen": "^0.5.0",
                  "regjsparser": "^0.6.0",
                  "unicode-match-property-ecmascript": "^1.0.4",
                  "unicode-match-property-value-ecmascript": "^1.1.0"
              }
            },
            "regjsgen": {
              "version": "0.5.1",
                "resolved": "https://registry.npmjs.org/regjsgen/-/regjsgen-0.5.1.tgz",
                "integrity": "sha512-5qxzGZjDs9w4tzT3TPhCJqWdCc3RLYwy9J2NB0nm5Lz+S273lvWcpjaTGHsT1dc6Hhfq41uSEOw8wBmxrKOuyg=="
            },
            "regjsparser": {
              "version": "0.6.2",
                "resolved": "https://registry.npmjs.org/regjsparser/-/regjsparser-0.6.2.tgz",
                "integrity": "sha512-E9ghzUtoLwDekPT0DYCp+c4h+bvuUpe6rRHCTYn6eGoqj1LgKXxT6I0Il4WbjhQkOghzi/V+y03bPKvbllL93Q==",
                "requires": {
                "jsesc": "~0.5.0"
              },
              "dependencies": {
                "jsesc": {
                  "version": "0.5.0",
                    "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-0.5.0.tgz",
                    "integrity": "sha1-597mbjXW/Bb3EP6R1c9p9w8IkR0="
                }
              }
            },
            "relateurl": {
              "version": "0.2.7",
                "resolved": "https://registry.npmjs.org/relateurl/-/relateurl-0.2.7.tgz",
                "integrity": "sha1-VNvzd+UUQKypCkzSdGANP/LYiKk="
            },
            "remove-trailing-separator": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",
                "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="
            },
            "renderkid": {
              "version": "2.0.3",
                "resolved": "https://registry.npmjs.org/renderkid/-/renderkid-2.0.3.tgz",
                "integrity": "sha512-z8CLQp7EZBPCwCnncgf9C4XAi3WR0dv+uWu/PjIyhhAb5d6IJ/QZqlHFprHeKT+59//V6BNUsLbvN8+2LarxGA==",
                "requires": {
                "css-select": "^1.1.0",
                  "dom-converter": "^0.2",
                  "htmlparser2": "^3.3.0",
                  "strip-ansi": "^3.0.0",
                  "utila": "^0.4.0"
              },
              "dependencies": {
                "css-select": {
                  "version": "1.2.0",
                    "resolved": "https://registry.npmjs.org/css-select/-/css-select-1.2.0.tgz",
                    "integrity": "sha1-KzoRBTnFNV8c2NMUYj6HCxIeyFg=",
                    "requires": {
                    "boolbase": "~1.0.0",
                      "css-what": "2.1",
                      "domutils": "1.5.1",
                      "nth-check": "~1.0.1"
                  }
                },
                "css-what": {
                  "version": "2.1.3",
                    "resolved": "https://registry.npmjs.org/css-what/-/css-what-2.1.3.tgz",
                    "integrity": "sha512-a+EPoD+uZiNfh+5fxw2nO9QwFa6nJe2Or35fGY6Ipw1R3R4AGz1d1TEZrCegvw2YTmZ0jXirGYlzxxpYSHwpEg=="
                },
                "domutils": {
                  "version": "1.5.1",
                    "resolved": "https://registry.npmjs.org/domutils/-/domutils-1.5.1.tgz",
                    "integrity": "sha1-3NhIiib1Y9YQeeSMn3t+Mjc2gs8=",
                    "requires": {
                    "dom-serializer": "0",
                      "domelementtype": "1"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                }
              }
            },
            "repeat-element": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.3.tgz",
                "integrity": "sha512-ahGq0ZnV5m5XtZLMb+vP76kcAM5nkLqk0lpqAuojSKGgQtn4eRi4ZZGm2olo2zKFH+sMsWaqOCW1dqAnOru72g=="
            },
            "repeat-string": {
              "version": "1.6.1",
                "resolved": "https://registry.npmjs.org/repeat-string/-/repeat-string-1.6.1.tgz",
                "integrity": "sha1-jcrkcOHIirwtYA//Sndihtp15jc="
            },
            "repeating": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/repeating/-/repeating-2.0.1.tgz",
                "integrity": "sha1-UhTFOpJtNVJwdSf7q0FdvAjQbdo=",
                "requires": {
                "is-finite": "^1.0.0"
              }
            },
            "request": {
              "version": "2.88.0",
                "resolved": "https://registry.npmjs.org/request/-/request-2.88.0.tgz",
                "integrity": "sha512-NAqBSrijGLZdM0WZNsInLJpkJokL72XYjUpnB0iwsRgxh7dB6COrHnTBNwN0E+lHDAJzu7kLAkDeY08z2/A0hg==",
                "requires": {
                "aws-sign2": "~0.7.0",
                  "aws4": "^1.8.0",
                  "caseless": "~0.12.0",
                  "combined-stream": "~1.0.6",
                  "extend": "~3.0.2",
                  "forever-agent": "~0.6.1",
                  "form-data": "~2.3.2",
                  "har-validator": "~5.1.0",
                  "http-signature": "~1.2.0",
                  "is-typedarray": "~1.0.0",
                  "isstream": "~0.1.2",
                  "json-stringify-safe": "~5.0.1",
                  "mime-types": "~2.1.19",
                  "oauth-sign": "~0.9.0",
                  "performance-now": "^2.1.0",
                  "qs": "~6.5.2",
                  "safe-buffer": "^5.1.2",
                  "tough-cookie": "~2.4.3",
                  "tunnel-agent": "^0.6.0",
                  "uuid": "^3.3.2"
              }
            },
            "request-promise-core": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/request-promise-core/-/request-promise-core-1.1.3.tgz",
                "integrity": "sha512-QIs2+ArIGQVp5ZYbWD5ZLCY29D5CfWizP8eWnm8FoGD1TX61veauETVQbrV60662V0oFBkrDOuaBI8XgtuyYAQ==",
                "requires": {
                "lodash": "^4.17.15"
              }
            },
            "request-promise-native": {
              "version": "1.0.8",
                "resolved": "https://registry.npmjs.org/request-promise-native/-/request-promise-native-1.0.8.tgz",
                "integrity": "sha512-dapwLGqkHtwL5AEbfenuzjTYg35Jd6KPytsC2/TLkVMz8rm+tNt72MGUWT1RP/aYawMpN6HqbNGBQaRcBtjQMQ==",
                "requires": {
                "request-promise-core": "1.1.3",
                  "stealthy-require": "^1.1.1",
                  "tough-cookie": "^2.3.3"
              }
            },
            "require-directory": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
                "integrity": "sha1-jGStX9MNqxyXbiNE/+f3kqam30I="
            },
            "require-main-filename": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-1.0.1.tgz",
                "integrity": "sha1-l/cXtp1IeE9fUmpsWqj/3aBVpNE="
            },
            "require-uncached": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/require-uncached/-/require-uncached-1.0.3.tgz",
                "integrity": "sha1-Tg1W1slmL9MeQwEcS5WqSZVUIdM=",
                "dev": true,
                "requires": {
                "caller-path": "^0.1.0",
                  "resolve-from": "^1.0.0"
              },
              "dependencies": {
                "caller-path": {
                  "version": "0.1.0",
                    "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-0.1.0.tgz",
                    "integrity": "sha1-lAhe9jWB7NPaqSREqP6U6CV3dR8=",
                    "dev": true,
                    "requires": {
                    "callsites": "^0.2.0"
                  }
                },
                "callsites": {
                  "version": "0.2.0",
                    "resolved": "https://registry.npmjs.org/callsites/-/callsites-0.2.0.tgz",
                    "integrity": "sha1-r6uWJikQp/M8GaV3WCXGnzTjUMo=",
                    "dev": true
                },
                "resolve-from": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-1.0.1.tgz",
                    "integrity": "sha1-Jsv+k10a7uq7Kbw/5a6wHpPUQiY=",
                    "dev": true
                }
              }
            },
            "requires-port": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
                "integrity": "sha1-kl0mAdOaxIXgkc8NpcbmlNw9yv8="
            },
            "resize-observer-polyfill": {
              "version": "1.5.1",
                "resolved": "https://registry.npmjs.org/resize-observer-polyfill/-/resize-observer-polyfill-1.5.1.tgz",
                "integrity": "sha512-LwZrotdHOo12nQuZlHEmtuXdqGoOD0OhaxopaNFxWzInpEgaLWoVuAMbTzixuosCx2nEG58ngzW3vxdWoxIgdg=="
            },
            "resolve": {
              "version": "1.9.0",
                "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.9.0.tgz",
                "integrity": "sha512-TZNye00tI67lwYvzxCxHGjwTNlUV70io54/Ed4j6PscB8xVfuBJpRenI/o6dVk0cY0PYTY27AgCoGGxRnYuItQ==",
                "requires": {
                "path-parse": "^1.0.6"
              }
            },
            "resolve-cwd": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/resolve-cwd/-/resolve-cwd-2.0.0.tgz",
                "integrity": "sha1-AKn3OHVW4nA46uIyyqNypqWbZlo=",
                "requires": {
                "resolve-from": "^3.0.0"
              }
            },
            "resolve-from": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-3.0.0.tgz",
                "integrity": "sha1-six699nWiBvItuZTM17rywoYh0g="
            },
            "resolve-pathname": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/resolve-pathname/-/resolve-pathname-3.0.0.tgz",
                "integrity": "sha512-C7rARubxI8bXFNB/hqcp/4iUeIXJhJZvFPFPiSPRnhU5UPxzMFIl+2E6yY6c4k9giDJAhtV+enfA+G89N6Csng=="
            },
            "resolve-url": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",
                "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo="
            },
            "resolve-url-loader": {
              "version": "3.1.1",
                "resolved": "https://registry.npmjs.org/resolve-url-loader/-/resolve-url-loader-3.1.1.tgz",
                "integrity": "sha512-K1N5xUjj7v0l2j/3Sgs5b8CjrrgtC70SmdCuZiJ8tSyb5J+uk3FoeZ4b7yTnH6j7ngI+Bc5bldHJIa8hYdu2gQ==",
                "requires": {
                "adjust-sourcemap-loader": "2.0.0",
                  "camelcase": "5.3.1",
                  "compose-function": "3.0.3",
                  "convert-source-map": "1.7.0",
                  "es6-iterator": "2.0.3",
                  "loader-utils": "1.2.3",
                  "postcss": "7.0.21",
                  "rework": "1.0.1",
                  "rework-visit": "1.0.0",
                  "source-map": "0.6.1"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "chalk": {
                  "version": "2.4.2",
                    "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
                    "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
                    "requires": {
                    "ansi-styles": "^3.2.1",
                      "escape-string-regexp": "^1.0.5",
                      "supports-color": "^5.3.0"
                  },
                  "dependencies": {
                    "supports-color": {
                      "version": "5.5.0",
                        "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
                        "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
                        "requires": {
                        "has-flag": "^3.0.0"
                      }
                    }
                  }
                },
                "convert-source-map": {
                  "version": "1.7.0",
                    "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.7.0.tgz",
                    "integrity": "sha512-4FJkXzKXEDB1snCFZlLP4gpC3JILicCpGbzG9f9G7tGqGCzETQ2hWPrcinA9oU4wtf2biUaEH5065UnMeR33oA==",
                    "requires": {
                    "safe-buffer": "~5.1.1"
                  }
                },
                "postcss": {
                  "version": "7.0.21",
                    "resolved": "https://registry.npmjs.org/postcss/-/postcss-7.0.21.tgz",
                    "integrity": "sha512-uIFtJElxJo29QC753JzhidoAhvp/e/Exezkdhfmt8AymWT6/5B7W1WmponYWkHk2eg6sONyTch0A3nkMPun3SQ==",
                    "requires": {
                    "chalk": "^2.4.2",
                      "source-map": "^0.6.1",
                      "supports-color": "^6.1.0"
                  }
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                },
                "supports-color": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
                    "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
                    "requires": {
                    "has-flag": "^3.0.0"
                  }
                }
              }
            },
            "restore-cursor": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-2.0.0.tgz",
                "integrity": "sha1-n37ih/gv0ybU/RYpI9YhKe7g368=",
                "requires": {
                "onetime": "^2.0.0",
                  "signal-exit": "^3.0.2"
              }
            },
            "ret": {
              "version": "0.1.15",
                "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",
                "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg=="
            },
            "retry": {
              "version": "0.12.0",
                "resolved": "https://registry.npmjs.org/retry/-/retry-0.12.0.tgz",
                "integrity": "sha1-G0KmJmoh8HQh0bC1S33BZ7AcATs="
            },
            "rework": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/rework/-/rework-1.0.1.tgz",
                "integrity": "sha1-MIBqhBNCtUUQqkEQhQzUhTQUSqc=",
                "requires": {
                "convert-source-map": "^0.3.3",
                  "css": "^2.0.0"
              },
              "dependencies": {
                "convert-source-map": {
                  "version": "0.3.5",
                    "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-0.3.5.tgz",
                    "integrity": "sha1-8dgClQr33SYxof6+BZZVDIarMZA="
                }
              }
            },
            "rework-visit": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/rework-visit/-/rework-visit-1.0.0.tgz",
                "integrity": "sha1-mUWygD8hni96ygCtuLyfZA+ELJo="
            },
            "rgb-regex": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/rgb-regex/-/rgb-regex-1.0.1.tgz",
                "integrity": "sha1-wODWiC3w4jviVKR16O3UGRX+rrE="
            },
            "rgba-regex": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/rgba-regex/-/rgba-regex-1.0.0.tgz",
                "integrity": "sha1-QzdOLiyglosO8VI0YLfXMP8i7rM="
            },
            "rimraf": {
              "version": "2.6.3",
                "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.6.3.tgz",
                "integrity": "sha512-mwqeW5XsA2qAejG46gYdENaxXjx9onRNCfn7L0duuP4hCuTIi/QO7PDK07KJfp1d+izWPrzEJDcSqBa0OZQriA==",
                "requires": {
                "glob": "^7.1.3"
              }
            },
            "ripemd160": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/ripemd160/-/ripemd160-2.0.2.tgz",
                "integrity": "sha512-ii4iagi25WusVoiC4B4lq7pbXfAp3D9v5CwfkY33vffw2+pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA==",
                "requires": {
                "hash-base": "^3.0.0",
                  "inherits": "^2.0.1"
              }
            },
            "rmc-feedback": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/rmc-feedback/-/rmc-feedback-2.0.0.tgz",
                "integrity": "sha512-5PWOGOW7VXks/l3JzlOU9NIxRpuaSS8d9zA3UULUCuTKnpwBHNvv1jSJzxgbbCQeYzROWUpgKI4za3X4C/mKmQ==",
                "requires": {
                "babel-runtime": "6.x",
                  "classnames": "^2.2.5"
              }
            },
            "rsvp": {
              "version": "4.8.5",
                "resolved": "https://registry.npmjs.org/rsvp/-/rsvp-4.8.5.tgz",
                "integrity": "sha512-nfMOlASu9OnRJo1mbEk2cz0D56a1MBNrJ7orjRZQG10XDyuvwksKbuXNp6qa+kbn839HwjwhBzhFmdsaEAfauA=="
            },
            "run-async": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/run-async/-/run-async-2.3.0.tgz",
                "integrity": "sha1-A3GrSuC91yDUFm19/aZP96RFpsA=",
                "requires": {
                "is-promise": "^2.1.0"
              }
            },
            "run-parallel": {
              "version": "1.1.9",
                "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.1.9.tgz",
                "integrity": "sha512-DEqnSRTDw/Tc3FXf49zedI638Z9onwUotBMiUFKmrO2sdFKIbXamXGQ3Axd4qgphxKB4kw/qP1w5kTxnfU1B9Q==",
                "dev": true
            },
            "run-queue": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/run-queue/-/run-queue-1.0.3.tgz",
                "integrity": "sha1-6Eg5bwV9Ij8kOGkkYY4laUFh7Ec=",
                "requires": {
                "aproba": "^1.1.1"
              }
            },
            "rxjs": {
              "version": "6.5.2",
                "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.2.tgz",
                "integrity": "sha512-HUb7j3kvb7p7eCUHE3FqjoDsC1xfZQ4AHFWfTKSpZ+sAhhz5X1WX0ZuUqWbzB2QhSLp3DoLUG+hMdEDKqWo2Zg==",
                "requires": {
                "tslib": "^1.9.0"
              }
            },
            "safe-buffer": {
              "version": "5.1.2",
                "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
                "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
            },
            "safe-regex": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/safe-regex/-/safe-regex-1.1.0.tgz",
                "integrity": "sha1-QKNmnzsHfR6UPURinhV91IAjvy4=",
                "requires": {
                "ret": "~0.1.10"
              }
            },
            "safer-buffer": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
                "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
            },
            "sane": {
              "version": "4.1.0",
                "resolved": "https://registry.npmjs.org/sane/-/sane-4.1.0.tgz",
                "integrity": "sha512-hhbzAgTIX8O7SHfp2c8/kREfEn4qO/9q8C9beyY6+tvZ87EpoZ3i1RIEvp27YBswnNbY9mWd6paKVmKbAgLfZA==",
                "requires": {
                "@cnakazawa/watch": "^1.0.3",
                  "anymatch": "^2.0.0",
                  "capture-exit": "^2.0.0",
                  "exec-sh": "^0.3.2",
                  "execa": "^1.0.0",
                  "fb-watchman": "^2.0.0",
                  "micromatch": "^3.1.4",
                  "minimist": "^1.1.1",
                  "walker": "~1.0.5"
              }
            },
            "sanitize.css": {
              "version": "10.0.0",
                "resolved": "https://registry.npmjs.org/sanitize.css/-/sanitize.css-10.0.0.tgz",
                "integrity": "sha512-vTxrZz4dX5W86M6oVWVdOVe72ZiPs41Oi7Z6Km4W5Turyz28mrXSJhhEBZoRtzJWIv3833WKVwLSDWWkEfupMg=="
            },
            "sass-graph": {
              "version": "2.2.4",
                "resolved": "https://registry.npmjs.org/sass-graph/-/sass-graph-2.2.4.tgz",
                "integrity": "sha1-E/vWPNHK8JCLn9k0dq1DpR0eC0k=",
                "requires": {
                "glob": "^7.0.0",
                  "lodash": "^4.0.0",
                  "scss-tokenizer": "^0.2.3",
                  "yargs": "^7.0.0"
              }
            },
            "sass-loader": {
              "version": "8.0.0",
                "resolved": "https://registry.npmjs.org/sass-loader/-/sass-loader-8.0.0.tgz",
                "integrity": "sha512-+qeMu563PN7rPdit2+n5uuYVR0SSVwm0JsOUsaJXzgYcClWSlmX0iHDnmeOobPkf5kUglVot3QS6SyLyaQoJ4w==",
                "requires": {
                "clone-deep": "^4.0.1",
                  "loader-utils": "^1.2.3",
                  "neo-async": "^2.6.1",
                  "schema-utils": "^2.1.0",
                  "semver": "^6.3.0"
              },
              "dependencies": {
                "clone-deep": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-4.0.1.tgz",
                    "integrity": "sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==",
                    "requires": {
                    "is-plain-object": "^2.0.4",
                      "kind-of": "^6.0.2",
                      "shallow-clone": "^3.0.0"
                  }
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                },
                "shallow-clone": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-3.0.1.tgz",
                    "integrity": "sha512-/6KqX+GVUdqPuPPd2LxDDxzX6CAbjJehAAOKlNpqqUpAqPM6HeL8f+o3a+JsyGjn2lv0WY8UsTgUJjU9Ok55NA==",
                    "requires": {
                    "kind-of": "^6.0.2"
                  }
                }
              }
            },
            "sax": {
              "version": "1.2.4",
                "resolved": "https://registry.npmjs.org/sax/-/sax-1.2.4.tgz",
                "integrity": "sha512-NqVDv9TpANUjFm0N8uM5GxL36UgKi9/atZw+x7YFnQ8ckwFGKrl4xX4yWtrey3UJm5nP1kUbnYgLopqWNSRhWw=="
            },
            "saxes": {
              "version": "3.1.11",
                "resolved": "https://registry.npmjs.org/saxes/-/saxes-3.1.11.tgz",
                "integrity": "sha512-Ydydq3zC+WYDJK1+gRxRapLIED9PWeSuuS41wqyoRmzvhhh9nc+QQrVMKJYzJFULazeGhzSV0QleN2wD3boh2g==",
                "requires": {
                "xmlchars": "^2.1.1"
              }
            },
            "scheduler": {
              "version": "0.13.6",
                "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.13.6.tgz",
                "integrity": "sha512-IWnObHt413ucAYKsD9J1QShUKkbKLQQHdxRyw73sw4FN26iWr3DY/H34xGPe4nmL1DwXyWmSWmMrA9TfQbE/XQ==",
                "requires": {
                "loose-envify": "^1.1.0",
                  "object-assign": "^4.1.1"
              }
            },
            "schema-utils": {
              "version": "2.6.1",
                "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-2.6.1.tgz",
                "integrity": "sha512-0WXHDs1VDJyo+Zqs9TKLKyD/h7yDpHUhEFsM2CzkICFdoX1av+GBq/J2xRTFfsQO5kBfhZzANf2VcIm84jqDbg==",
                "requires": {
                "ajv": "^6.10.2",
                  "ajv-keywords": "^3.4.1"
              },
              "dependencies": {
                "ajv": {
                  "version": "6.10.2",
                    "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.10.2.tgz",
                    "integrity": "sha512-TXtUUEYHuaTEbLZWIKUr5pmBuhDLy+8KYtPYdcV8qC+pOZL+NKqYwvWSRrVXHn+ZmRRAu8vJTAznH7Oag6RVRw==",
                    "requires": {
                    "fast-deep-equal": "^2.0.1",
                      "fast-json-stable-stringify": "^2.0.0",
                      "json-schema-traverse": "^0.4.1",
                      "uri-js": "^4.2.2"
                  }
                }
              }
            },
            "scss-tokenizer": {
              "version": "0.2.3",
                "resolved": "https://registry.npmjs.org/scss-tokenizer/-/scss-tokenizer-0.2.3.tgz",
                "integrity": "sha1-jrBtualyMzOCTT9VMGQRSYR85dE=",
                "requires": {
                "js-base64": "^2.1.8",
                  "source-map": "^0.4.2"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.4.4",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz",
                    "integrity": "sha1-66T12pwNyZneaAMti092FzZSA2s=",
                    "requires": {
                    "amdefine": ">=0.0.4"
                  }
                }
              }
            },
            "select-hose": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/select-hose/-/select-hose-2.0.0.tgz",
                "integrity": "sha1-Yl2GWPhlr0Psliv8N2o3NZpJlMo="
            },
            "selfsigned": {
              "version": "1.10.7",
                "resolved": "https://registry.npmjs.org/selfsigned/-/selfsigned-1.10.7.tgz",
                "integrity": "sha512-8M3wBCzeWIJnQfl43IKwOmC4H/RAp50S8DF60znzjW5GVqTcSe2vWclt7hmYVPkKPlHWOu5EaWOMZ2Y6W8ZXTA==",
                "requires": {
                "node-forge": "0.9.0"
              }
            },
            "semver": {
              "version": "5.6.0",
                "resolved": "https://registry.npmjs.org/semver/-/semver-5.6.0.tgz",
                "integrity": "sha512-RS9R6R35NYgQn++fkDWaOmqGoj4Ek9gGs+DPxNUZKuwE183xjJroKvyo1IzVFeXvUrvmALy6FWD5xrdJT25gMg=="
            },
            "send": {
              "version": "0.17.1",
                "resolved": "https://registry.npmjs.org/send/-/send-0.17.1.tgz",
                "integrity": "sha512-BsVKsiGcQMFwT8UxypobUKyv7irCNRHk1T0G680vk88yf6LBByGcZJOTJCrTP2xVN6yI+XjPJcNuE3V4fT9sAg==",
                "requires": {
                "debug": "2.6.9",
                  "depd": "~1.1.2",
                  "destroy": "~1.0.4",
                  "encodeurl": "~1.0.2",
                  "escape-html": "~1.0.3",
                  "etag": "~1.8.1",
                  "fresh": "0.5.2",
                  "http-errors": "~1.7.2",
                  "mime": "1.6.0",
                  "ms": "2.1.1",
                  "on-finished": "~2.3.0",
                  "range-parser": "~1.2.1",
                  "statuses": "~1.5.0"
              },
              "dependencies": {
                "mime": {
                  "version": "1.6.0",
                    "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
                    "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg=="
                }
              }
            },
            "serialize-javascript": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/serialize-javascript/-/serialize-javascript-2.1.2.tgz",
                "integrity": "sha512-rs9OggEUF0V4jUSecXazOYsLfu7OGK2qIn3c7IPBiffz32XniEp/TX9Xmc9LQfK2nQ2QKHvZ2oygKUGU0lG4jQ=="
            },
            "serve-index": {
              "version": "1.9.1",
                "resolved": "https://registry.npmjs.org/serve-index/-/serve-index-1.9.1.tgz",
                "integrity": "sha1-03aNabHn2C5c4FD/9bRTvqEqkjk=",
                "requires": {
                "accepts": "~1.3.4",
                  "batch": "0.6.1",
                  "debug": "2.6.9",
                  "escape-html": "~1.0.3",
                  "http-errors": "~1.6.2",
                  "mime-types": "~2.1.17",
                  "parseurl": "~1.3.2"
              },
              "dependencies": {
                "http-errors": {
                  "version": "1.6.3",
                    "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-1.6.3.tgz",
                    "integrity": "sha1-i1VoC7S+KDoLW/TqLjhYC+HZMg0=",
                    "requires": {
                    "depd": "~1.1.2",
                      "inherits": "2.0.3",
                      "setprototypeof": "1.1.0",
                      "statuses": ">= 1.4.0 < 2"
                  }
                },
                "setprototypeof": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.0.tgz",
                    "integrity": "sha512-BvE/TwpZX4FXExxOxZyRGQQv651MSwmWKZGqvmPcRIjDqWub67kTKuIMx43cZZrS/cBBzwBcNDWoFxt2XEFIpQ=="
                }
              }
            },
            "serve-static": {
              "version": "1.14.1",
                "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.14.1.tgz",
                "integrity": "sha512-JMrvUwE54emCYWlTI+hGrGv5I8dEwmco/00EvkzIIsR7MqrHonbD9pO2MOfFnpFntl7ecpZs+3mW+XbQZu9QCg==",
                "requires": {
                "encodeurl": "~1.0.2",
                  "escape-html": "~1.0.3",
                  "parseurl": "~1.3.3",
                  "send": "0.17.1"
              }
            },
            "set-blocking": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
                "integrity": "sha1-BF+XgtARrppoA93TgrJDkrPYkPc="
            },
            "set-value": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/set-value/-/set-value-2.0.1.tgz",
                "integrity": "sha512-JxHc1weCN68wRY0fhCoXpyK55m/XPHafOmK4UWD7m2CI14GMcFypt4w/0+NV5f/ZMby2F6S2wwA7fgynh9gWSw==",
                "requires": {
                "extend-shallow": "^2.0.1",
                  "is-extendable": "^0.1.1",
                  "is-plain-object": "^2.0.3",
                  "split-string": "^3.0.1"
              },
              "dependencies": {
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                }
              }
            },
            "setimmediate": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",
                "integrity": "sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU="
            },
            "setprototypeof": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.1.tgz",
                "integrity": "sha512-JvdAWfbXeIGaZ9cILp38HntZSFSo3mWg6xGcJJsd+d4aRMOqauag1C63dJfDw7OaMYwEbHMOxEZ1lqVRYP2OAw=="
            },
            "sha.js": {
              "version": "2.4.11",
                "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
                "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
                "requires": {
                "inherits": "^2.0.1",
                  "safe-buffer": "^5.0.1"
              }
            },
            "shallow-clone": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/shallow-clone/-/shallow-clone-0.1.2.tgz",
                "integrity": "sha1-WQnodLp3EG1zrEFM/sH/yofZcGA=",
                "requires": {
                "is-extendable": "^0.1.1",
                  "kind-of": "^2.0.1",
                  "lazy-cache": "^0.2.3",
                  "mixin-object": "^2.0.1"
              },
              "dependencies": {
                "kind-of": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-2.0.1.tgz",
                    "integrity": "sha1-AY7HpM5+OobLkUG+UZ0kyPqpgbU=",
                    "requires": {
                    "is-buffer": "^1.0.2"
                  }
                },
                "lazy-cache": {
                  "version": "0.2.7",
                    "resolved": "https://registry.npmjs.org/lazy-cache/-/lazy-cache-0.2.7.tgz",
                    "integrity": "sha1-f+3fLctu23fRHvHRF6tf/fCrG2U="
                }
              }
            },
            "shallow-equal": {
              "version": "1.2.1",
                "resolved": "https://registry.npmjs.org/shallow-equal/-/shallow-equal-1.2.1.tgz",
                "integrity": "sha512-S4vJDjHHMBaiZuT9NPb616CSmLf618jawtv3sufLl6ivK8WocjAo58cXwbRV1cgqxH0Qbv+iUt6m05eqEa2IRA=="
            },
            "shallowequal": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/shallowequal/-/shallowequal-1.1.0.tgz",
                "integrity": "sha512-y0m1JoUZSlPAjXVtPPW70aZWfIL/dSP7AFkRnniLCrK/8MDKog3TySTBmckD+RObVxH0v4Tox67+F14PdED2oQ=="
            },
            "shebang-command": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-1.2.0.tgz",
                "integrity": "sha1-RKrGW2lbAzmJaMOfNj/uXer98eo=",
                "requires": {
                "shebang-regex": "^1.0.0"
              }
            },
            "shebang-regex": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-1.0.0.tgz",
                "integrity": "sha1-2kL0l0DAtC2yypcoVxyxkMmO/qM="
            },
            "shell-quote": {
              "version": "1.7.2",
                "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.7.2.tgz",
                "integrity": "sha512-mRz/m/JVscCrkMyPqHc/bczi3OQHkLTqXHEFu0zDhK/qfv3UcOA4SVmRCLmos4bhjr9ekVQubj/R7waKapmiQg=="
            },
            "shellwords": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/shellwords/-/shellwords-0.1.1.tgz",
                "integrity": "sha512-vFwSUfQvqybiICwZY5+DAWIPLKsWO31Q91JSKl3UYv+K5c2QRPzn0qzec6QPu1Qc9eHYItiP3NdJqNVqetYAww=="
            },
            "signal-exit": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.2.tgz",
                "integrity": "sha1-tf3AjxKH6hF4Yo5BXiUTK3NkbG0="
            },
            "simple-swizzle": {
              "version": "0.2.2",
                "resolved": "https://registry.npmjs.org/simple-swizzle/-/simple-swizzle-0.2.2.tgz",
                "integrity": "sha1-pNprY1/8zMoz9w0Xy5JZLeleVXo=",
                "requires": {
                "is-arrayish": "^0.3.1"
              },
              "dependencies": {
                "is-arrayish": {
                  "version": "0.3.2",
                    "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.3.2.tgz",
                    "integrity": "sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ=="
                }
              }
            },
            "sisteransi": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.4.tgz",
                "integrity": "sha512-/ekMoM4NJ59ivGSfKapeG+FWtrmWvA1p6FBZwXrqojw90vJu8lBmrTxCMuBCydKtkaUe2zt4PlxeTKpjwMbyig=="
            },
            "slash": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/slash/-/slash-2.0.0.tgz",
                "integrity": "sha512-ZYKh3Wh2z1PpEXWr0MpSBZ0V6mZHAQfYevttO11c51CaWjGTaadiKZ+wVt1PbMlDV5qhMFslpZCemhwOK7C89A=="
            },
            "slice-ansi": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-2.1.0.tgz",
                "integrity": "sha512-Qu+VC3EwYLldKa1fCxuuvULvSJOKEgk9pi8dZeCVK7TqBfUNTH4sFkk4joj8afVSfAYgJoSOetjx9QWOJ5mYoQ==",
                "requires": {
                "ansi-styles": "^3.2.0",
                  "astral-regex": "^1.0.0",
                  "is-fullwidth-code-point": "^2.0.0"
              }
            },
            "snapdragon": {
              "version": "0.8.2",
                "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",
                "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",
                "requires": {
                "base": "^0.11.1",
                  "debug": "^2.2.0",
                  "define-property": "^0.2.5",
                  "extend-shallow": "^2.0.1",
                  "map-cache": "^0.2.2",
                  "source-map": "^0.5.6",
                  "source-map-resolve": "^0.5.0",
                  "use": "^3.1.0"
              },
              "dependencies": {
                "define-property": {
                  "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                    "is-descriptor": "^0.1.0"
                  }
                },
                "extend-shallow": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",
                    "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",
                    "requires": {
                    "is-extendable": "^0.1.0"
                  }
                }
              }
            },
            "snapdragon-node": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",
                "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",
                "requires": {
                "define-property": "^1.0.0",
                  "isobject": "^3.0.0",
                  "snapdragon-util": "^3.0.1"
              },
              "dependencies": {
                "define-property": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
                    "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
                    "requires": {
                    "is-descriptor": "^1.0.0"
                  }
                },
                "is-accessor-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
                    "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-data-descriptor": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
                    "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
                    "requires": {
                    "kind-of": "^6.0.0"
                  }
                },
                "is-descriptor": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
                    "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
                    "requires": {
                    "is-accessor-descriptor": "^1.0.0",
                      "is-data-descriptor": "^1.0.0",
                      "kind-of": "^6.0.2"
                  }
                },
                "kind-of": {
                  "version": "6.0.2",
                    "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-6.0.2.tgz",
                    "integrity": "sha512-s5kLOcnH0XqDO+FvuaLX8DDjZ18CGFk7VygH40QoKPUQhW4e2rvM0rwUq0t8IQDOwYSeLK01U90OjzBTme2QqA=="
                }
              }
            },
            "snapdragon-util": {
              "version": "3.0.1",
                "resolved": "https://registry.npmjs.org/snapdragon-util/-/snapdragon-util-3.0.1.tgz",
                "integrity": "sha512-mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe+Zn99hVEYcMvKPct1IqNe7+AZPirn8BCDOQBHQZknqmKlZQ==",
                "requires": {
                "kind-of": "^3.2.0"
              }
            },
            "sockjs": {
              "version": "0.3.19",
                "resolved": "https://registry.npmjs.org/sockjs/-/sockjs-0.3.19.tgz",
                "integrity": "sha512-V48klKZl8T6MzatbLlzzRNhMepEys9Y4oGFpypBFFn1gLI/QQ9HtLLyWJNbPlwGLelOVOEijUbTTJeLLI59jLw==",
                "requires": {
                "faye-websocket": "^0.10.0",
                  "uuid": "^3.0.1"
              }
            },
            "sockjs-client": {
              "version": "1.4.0",
                "resolved": "https://registry.npmjs.org/sockjs-client/-/sockjs-client-1.4.0.tgz",
                "integrity": "sha512-5zaLyO8/nri5cua0VtOrFXBPK1jbL4+1cebT/mmKA1E1ZXOvJrII75bPu0l0k843G/+iAbhEqzyKr0w/eCCj7g==",
                "requires": {
                "debug": "^3.2.5",
                  "eventsource": "^1.0.7",
                  "faye-websocket": "~0.11.1",
                  "inherits": "^2.0.3",
                  "json3": "^3.3.2",
                  "url-parse": "^1.4.3"
              },
              "dependencies": {
                "debug": {
                  "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "faye-websocket": {
                  "version": "0.11.3",
                    "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.3.tgz",
                    "integrity": "sha512-D2y4bovYpzziGgbHYtGCMjlJM36vAl/y+xUyn1C+FVx8szd1E+86KwVw6XvYSzOP8iMpm1X0I4xJD+QtUb36OA==",
                    "requires": {
                    "websocket-driver": ">=0.5.1"
                  }
                }
              }
            },
            "sort-keys": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/sort-keys/-/sort-keys-1.1.2.tgz",
                "integrity": "sha1-RBttTTRnmPG05J6JIK37oOVD+a0=",
                "requires": {
                "is-plain-obj": "^1.0.0"
              }
            },
            "source-list-map": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/source-list-map/-/source-list-map-2.0.1.tgz",
                "integrity": "sha512-qnQ7gVMxGNxsiL4lEuJwe/To8UnK7fAnmbGEEH8RpLouuKbeEm0lhbQVFIrNSuB+G7tVrAlVsZgETT5nljf+Iw=="
            },
            "source-map": {
              "version": "0.5.7",
                "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
                "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w="
            },
            "source-map-resolve": {
              "version": "0.5.3",
                "resolved": "https://registry.npmjs.org/source-map-resolve/-/source-map-resolve-0.5.3.tgz",
                "integrity": "sha512-Htz+RnsXWk5+P2slx5Jh3Q66vhQj1Cllm0zvnaY98+NFx+Dv2CF/f5O/t8x+KaNdrdIAsruNzoh/KpialbqAnw==",
                "requires": {
                "atob": "^2.1.2",
                  "decode-uri-component": "^0.2.0",
                  "resolve-url": "^0.2.1",
                  "source-map-url": "^0.4.0",
                  "urix": "^0.1.0"
              }
            },
            "source-map-support": {
              "version": "0.4.18",
                "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.4.18.tgz",
                "integrity": "sha512-try0/JqxPLF9nOjvSta7tVondkP5dwgyLDjVoyMDlmjugT2lRZ1OfsrYTkCd2hkDnJTKRbO/Rl3orm8vlsUzbA==",
                "dev": true,
                "requires": {
                "source-map": "^0.5.6"
              }
            },
            "source-map-url": {
              "version": "0.4.0",
                "resolved": "https://registry.npmjs.org/source-map-url/-/source-map-url-0.4.0.tgz",
                "integrity": "sha1-PpNdfd1zYxuXZZlW1VEo6HtQhKM="
            },
            "spdx-correct": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/spdx-correct/-/spdx-correct-3.1.0.tgz",
                "integrity": "sha512-lr2EZCctC2BNR7j7WzJ2FpDznxky1sjfxvvYEyzxNyb6lZXHODmEoJeFu4JupYlkfha1KZpJyoqiJ7pgA1qq8Q==",
                "requires": {
                "spdx-expression-parse": "^3.0.0",
                  "spdx-license-ids": "^3.0.0"
              }
            },
            "spdx-exceptions": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/spdx-exceptions/-/spdx-exceptions-2.2.0.tgz",
                "integrity": "sha512-2XQACfElKi9SlVb1CYadKDXvoajPgBVPn/gOQLrTvHdElaVhr7ZEbqJaRnJLVNeaI4cMEAgVCeBMKF6MWRDCRA=="
            },
            "spdx-expression-parse": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/spdx-expression-parse/-/spdx-expression-parse-3.0.0.tgz",
                "integrity": "sha512-Yg6D3XpRD4kkOmTpdgbUiEJFKghJH03fiC1OPll5h/0sO6neh2jqRDVHOQ4o/LMea0tgCkbMgea5ip/e+MkWyg==",
                "requires": {
                "spdx-exceptions": "^2.1.0",
                  "spdx-license-ids": "^3.0.0"
              }
            },
            "spdx-license-ids": {
              "version": "3.0.5",
                "resolved": "https://registry.npmjs.org/spdx-license-ids/-/spdx-license-ids-3.0.5.tgz",
                "integrity": "sha512-J+FWzZoynJEXGphVIS+XEh3kFSjZX/1i9gFBaWQcB+/tmpe2qUsSBABpcxqxnAxFdiUFEgAX1bjYGQvIZmoz9Q=="
            },
            "spdy": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/spdy/-/spdy-4.0.1.tgz",
                "integrity": "sha512-HeZS3PBdMA+sZSu0qwpCxl3DeALD5ASx8pAX0jZdKXSpPWbQ6SYGnlg3BBmYLx5LtiZrmkAZfErCm2oECBcioA==",
                "requires": {
                "debug": "^4.1.0",
                  "handle-thing": "^2.0.0",
                  "http-deceiver": "^1.2.7",
                  "select-hose": "^2.0.0",
                  "spdy-transport": "^3.0.0"
              },
              "dependencies": {
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                }
              }
            },
            "spdy-transport": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/spdy-transport/-/spdy-transport-3.0.0.tgz",
                "integrity": "sha512-hsLVFE5SjA6TCisWeJXFKniGGOpBgMLmerfO2aCyCU5s7nJ/rpAepqmFifv/GCbSbueEeAJJnmSQ2rKC/g8Fcw==",
                "requires": {
                "debug": "^4.1.0",
                  "detect-node": "^2.0.4",
                  "hpack.js": "^2.1.6",
                  "obuf": "^1.1.2",
                  "readable-stream": "^3.0.6",
                  "wbuf": "^1.7.3"
              },
              "dependencies": {
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "readable-stream": {
                  "version": "3.4.0",
                    "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.4.0.tgz",
                    "integrity": "sha512-jItXPLmrSR8jmTRmRWJXCnGJsfy85mB3Wd/uINMXA65yrnFo0cPClFIUWzo2najVNSl+mx7/4W8ttlLWJe99pQ==",
                    "requires": {
                    "inherits": "^2.0.3",
                      "string_decoder": "^1.1.1",
                      "util-deprecate": "^1.0.1"
                  }
                }
              }
            },
            "split-string": {
              "version": "3.1.0",
                "resolved": "https://registry.npmjs.org/split-string/-/split-string-3.1.0.tgz",
                "integrity": "sha512-NzNVhJDYpwceVVii8/Hu6DKfD2G+NrQHlS/V/qgv763EYudVwEcMQNxd2lh+0VrUByXN/oJkl5grOhYWvQUYiw==",
                "requires": {
                "extend-shallow": "^3.0.0"
              }
            },
            "sprintf-js": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.0.3.tgz",
                "integrity": "sha1-BOaSb2YolTVPPdAVIDYzuFcpfiw="
            },
            "sshpk": {
              "version": "1.16.1",
                "resolved": "https://registry.npmjs.org/sshpk/-/sshpk-1.16.1.tgz",
                "integrity": "sha512-HXXqVUq7+pcKeLqqZj6mHFUMvXtOJt1uoUx09pFW6011inTMxqI8BA8PM95myrIyyKwdnzjdFjLiE6KBPVtJIg==",
                "requires": {
                "asn1": "~0.2.3",
                  "assert-plus": "^1.0.0",
                  "bcrypt-pbkdf": "^1.0.0",
                  "dashdash": "^1.12.0",
                  "ecc-jsbn": "~0.1.1",
                  "getpass": "^0.1.1",
                  "jsbn": "~0.1.0",
                  "safer-buffer": "^2.0.2",
                  "tweetnacl": "~0.14.0"
              }
            },
            "ssri": {
              "version": "7.1.0",
                "resolved": "https://registry.npmjs.org/ssri/-/ssri-7.1.0.tgz",
                "integrity": "sha512-77/WrDZUWocK0mvA5NTRQyveUf+wsrIc6vyrxpS8tVvYBcX215QbafrJR3KtkpskIzoFLqqNuuYQvxaMjXJ/0g==",
                "requires": {
                "figgy-pudding": "^3.5.1",
                  "minipass": "^3.1.1"
              }
            },
            "stable": {
              "version": "0.1.8",
                "resolved": "https://registry.npmjs.org/stable/-/stable-0.1.8.tgz",
                "integrity": "sha512-ji9qxRnOVfcuLDySj9qzhGSEFVobyt1kIOSkj1qZzYLzq7Tos/oUUWvotUPQLlrsidqsK6tBH89Bc9kL5zHA6w=="
            },
            "stack-utils": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/stack-utils/-/stack-utils-1.0.2.tgz",
                "integrity": "sha512-MTX+MeG5U994cazkjd/9KNAapsHnibjMLnfXodlkXw76JEea0UiNzrqidzo1emMwk7w5Qhc9jd4Bn9TBb1MFwA=="
            },
            "standard": {
              "version": "12.0.1",
                "resolved": "https://registry.npmjs.org/standard/-/standard-12.0.1.tgz",
                "integrity": "sha512-UqdHjh87OG2gUrNCSM4QRLF5n9h3TFPwrCNyVlkqu31Hej0L/rc8hzKqVvkb2W3x0WMq7PzZdkLfEcBhVOR6lg==",
                "dev": true,
                "requires": {
                "eslint": "~5.4.0",
                  "eslint-config-standard": "12.0.0",
                  "eslint-config-standard-jsx": "6.0.2",
                  "eslint-plugin-import": "~2.14.0",
                  "eslint-plugin-node": "~7.0.1",
                  "eslint-plugin-promise": "~4.0.0",
                  "eslint-plugin-react": "~7.11.1",
                  "eslint-plugin-standard": "~4.0.0",
                  "standard-engine": "~9.0.0"
              },
              "dependencies": {
                "ansi-regex": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
                    "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg=",
                    "dev": true
                },
                "chardet": {
                  "version": "0.4.2",
                    "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.4.2.tgz",
                    "integrity": "sha1-tUc7M9yXxCTl2Y3IfVXU2KKci/I=",
                    "dev": true
                },
                "debug": {
                  "version": "3.2.6",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
                    "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
                    "dev": true,
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "doctrine": {
                  "version": "2.1.0",
                    "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
                    "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
                    "dev": true,
                    "requires": {
                    "esutils": "^2.0.2"
                  }
                },
                "eslint": {
                  "version": "5.4.0",
                    "resolved": "https://registry.npmjs.org/eslint/-/eslint-5.4.0.tgz",
                    "integrity": "sha512-UIpL91XGex3qtL6qwyCQJar2j3osKxK9e3ano3OcGEIRM4oWIpCkDg9x95AXEC2wMs7PnxzOkPZ2gq+tsMS9yg==",
                    "dev": true,
                    "requires": {
                    "ajv": "^6.5.0",
                      "babel-code-frame": "^6.26.0",
                      "chalk": "^2.1.0",
                      "cross-spawn": "^6.0.5",
                      "debug": "^3.1.0",
                      "doctrine": "^2.1.0",
                      "eslint-scope": "^4.0.0",
                      "eslint-utils": "^1.3.1",
                      "eslint-visitor-keys": "^1.0.0",
                      "espree": "^4.0.0",
                      "esquery": "^1.0.1",
                      "esutils": "^2.0.2",
                      "file-entry-cache": "^2.0.0",
                      "functional-red-black-tree": "^1.0.1",
                      "glob": "^7.1.2",
                      "globals": "^11.7.0",
                      "ignore": "^4.0.2",
                      "imurmurhash": "^0.1.4",
                      "inquirer": "^5.2.0",
                      "is-resolvable": "^1.1.0",
                      "js-yaml": "^3.11.0",
                      "json-stable-stringify-without-jsonify": "^1.0.1",
                      "levn": "^0.3.0",
                      "lodash": "^4.17.5",
                      "minimatch": "^3.0.4",
                      "mkdirp": "^0.5.1",
                      "natural-compare": "^1.4.0",
                      "optionator": "^0.8.2",
                      "path-is-inside": "^1.0.2",
                      "pluralize": "^7.0.0",
                      "progress": "^2.0.0",
                      "regexpp": "^2.0.0",
                      "require-uncached": "^1.0.3",
                      "semver": "^5.5.0",
                      "strip-ansi": "^4.0.0",
                      "strip-json-comments": "^2.0.1",
                      "table": "^4.0.3",
                      "text-table": "^0.2.0"
                  }
                },
                "eslint-plugin-import": {
                  "version": "2.14.0",
                    "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.14.0.tgz",
                    "integrity": "sha512-FpuRtniD/AY6sXByma2Wr0TXvXJ4nA/2/04VPlfpmUDPOpOY264x+ILiwnrk/k4RINgDAyFZByxqPUbSQ5YE7g==",
                    "dev": true,
                    "requires": {
                    "contains-path": "^0.1.0",
                      "debug": "^2.6.8",
                      "doctrine": "1.5.0",
                      "eslint-import-resolver-node": "^0.3.1",
                      "eslint-module-utils": "^2.2.0",
                      "has": "^1.0.1",
                      "lodash": "^4.17.4",
                      "minimatch": "^3.0.3",
                      "read-pkg-up": "^2.0.0",
                      "resolve": "^1.6.0"
                  },
                  "dependencies": {
                    "debug": {
                      "version": "2.6.9",
                        "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
                        "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
                        "dev": true,
                        "requires": {
                        "ms": "2.0.0"
                      }
                    },
                    "doctrine": {
                      "version": "1.5.0",
                        "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-1.5.0.tgz",
                        "integrity": "sha1-N53Ocw9hZvds76TmcHoVmwLFpvo=",
                        "dev": true,
                        "requires": {
                        "esutils": "^2.0.2",
                          "isarray": "^1.0.0"
                      }
                    },
                    "ms": {
                      "version": "2.0.0",
                        "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
                        "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g=",
                        "dev": true
                    }
                  }
                },
                "eslint-plugin-node": {
                  "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/eslint-plugin-node/-/eslint-plugin-node-7.0.1.tgz",
                    "integrity": "sha512-lfVw3TEqThwq0j2Ba/Ckn2ABdwmL5dkOgAux1rvOk6CO7A6yGyPI2+zIxN6FyNkp1X1X/BSvKOceD6mBWSj4Yw==",
                    "dev": true,
                    "requires": {
                    "eslint-plugin-es": "^1.3.1",
                      "eslint-utils": "^1.3.1",
                      "ignore": "^4.0.2",
                      "minimatch": "^3.0.4",
                      "resolve": "^1.8.1",
                      "semver": "^5.5.0"
                  }
                },
                "eslint-plugin-promise": {
                  "version": "4.0.1",
                    "resolved": "https://registry.npmjs.org/eslint-plugin-promise/-/eslint-plugin-promise-4.0.1.tgz",
                    "integrity": "sha512-Si16O0+Hqz1gDHsys6RtFRrW7cCTB6P7p3OJmKp3Y3dxpQE2qwOA7d3xnV+0mBmrPoi0RBnxlCKvqu70te6wjg==",
                    "dev": true
                },
                "eslint-plugin-react": {
                  "version": "7.11.1",
                    "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.11.1.tgz",
                    "integrity": "sha512-cVVyMadRyW7qsIUh3FHp3u6QHNhOgVrLQYdQEB1bPWBsgbNCHdFAeNMquBMCcZJu59eNthX053L70l7gRt4SCw==",
                    "dev": true,
                    "requires": {
                    "array-includes": "^3.0.3",
                      "doctrine": "^2.1.0",
                      "has": "^1.0.3",
                      "jsx-ast-utils": "^2.0.1",
                      "prop-types": "^15.6.2"
                  }
                },
                "espree": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/espree/-/espree-4.1.0.tgz",
                    "integrity": "sha512-I5BycZW6FCVIub93TeVY1s7vjhP9CY6cXCznIRfiig7nRviKZYdRnj/sHEWC6A7WE9RDWOFq9+7OsWSYz8qv2w==",
                    "dev": true,
                    "requires": {
                    "acorn": "^6.0.2",
                      "acorn-jsx": "^5.0.0",
                      "eslint-visitor-keys": "^1.0.0"
                  }
                },
                "external-editor": {
                  "version": "2.2.0",
                    "resolved": "https://registry.npmjs.org/external-editor/-/external-editor-2.2.0.tgz",
                    "integrity": "sha512-bSn6gvGxKt+b7+6TKEv1ZycHleA7aHhRHyAqJyp5pbUFuYYNIzpZnQDk7AsYckyWdEnTeAnay0aCy2aV6iTk9A==",
                    "dev": true,
                    "requires": {
                    "chardet": "^0.4.0",
                      "iconv-lite": "^0.4.17",
                      "tmp": "^0.0.33"
                  }
                },
                "file-entry-cache": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-2.0.0.tgz",
                    "integrity": "sha1-w5KZDD5oR4PYOLjISkXYoEhFg2E=",
                    "dev": true,
                    "requires": {
                    "flat-cache": "^1.2.1",
                      "object-assign": "^4.0.1"
                  }
                },
                "flat-cache": {
                  "version": "1.3.4",
                    "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-1.3.4.tgz",
                    "integrity": "sha512-VwyB3Lkgacfik2vhqR4uv2rvebqmDvFu4jlN/C1RzWoJEo8I7z4Q404oiqYCkq41mni8EzQnm95emU9seckwtg==",
                    "dev": true,
                    "requires": {
                    "circular-json": "^0.3.1",
                      "graceful-fs": "^4.1.2",
                      "rimraf": "~2.6.2",
                      "write": "^0.2.1"
                  }
                },
                "inquirer": {
                  "version": "5.2.0",
                    "resolved": "https://registry.npmjs.org/inquirer/-/inquirer-5.2.0.tgz",
                    "integrity": "sha512-E9BmnJbAKLPGonz0HeWHtbKf+EeSP93paWO3ZYoUpq/aowXvYGjjCSuashhXPpzbArIjBbji39THkxTz9ZeEUQ==",
                    "dev": true,
                    "requires": {
                    "ansi-escapes": "^3.0.0",
                      "chalk": "^2.0.0",
                      "cli-cursor": "^2.1.0",
                      "cli-width": "^2.0.0",
                      "external-editor": "^2.1.0",
                      "figures": "^2.0.0",
                      "lodash": "^4.3.0",
                      "mute-stream": "0.0.7",
                      "run-async": "^2.2.0",
                      "rxjs": "^5.5.2",
                      "string-width": "^2.1.0",
                      "strip-ansi": "^4.0.0",
                      "through": "^2.3.6"
                  }
                },
                "rxjs": {
                  "version": "5.5.12",
                    "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-5.5.12.tgz",
                    "integrity": "sha512-xx2itnL5sBbqeeiVgNPVuQQ1nC8Jp2WfNJhXWHmElW9YmrpS9UVnNzhP3EH3HFqexO5Tlp8GhYY+WEcqcVMvGw==",
                    "dev": true,
                    "requires": {
                    "symbol-observable": "1.0.1"
                  }
                },
                "slice-ansi": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/slice-ansi/-/slice-ansi-1.0.0.tgz",
                    "integrity": "sha512-POqxBK6Lb3q6s047D/XsDVNPnF9Dl8JSaqe9h9lURl0OdNqy/ujDrOiIHtsqXMGbWWTIomRzAMaTyawAU//Reg==",
                    "dev": true,
                    "requires": {
                    "is-fullwidth-code-point": "^2.0.0"
                  }
                },
                "strip-ansi": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
                    "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
                    "dev": true,
                    "requires": {
                    "ansi-regex": "^3.0.0"
                  }
                },
                "symbol-observable": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/symbol-observable/-/symbol-observable-1.0.1.tgz",
                    "integrity": "sha1-g0D8RwLDEi310iKI+IKD9RPT/dQ=",
                    "dev": true
                },
                "table": {
                  "version": "4.0.3",
                    "resolved": "https://registry.npmjs.org/table/-/table-4.0.3.tgz",
                    "integrity": "sha512-S7rnFITmBH1EnyKcvxBh1LjYeQMmnZtCXSEbHcH6S0NoKit24ZuFO/T1vDcLdYsLQkM188PVVhQmzKIuThNkKg==",
                    "dev": true,
                    "requires": {
                    "ajv": "^6.0.1",
                      "ajv-keywords": "^3.0.0",
                      "chalk": "^2.1.0",
                      "lodash": "^4.17.4",
                      "slice-ansi": "1.0.0",
                      "string-width": "^2.1.1"
                  }
                },
                "write": {
                  "version": "0.2.1",
                    "resolved": "https://registry.npmjs.org/write/-/write-0.2.1.tgz",
                    "integrity": "sha1-X8A4KOJkzqP+kUVUdvejxWbLB1c=",
                    "dev": true,
                    "requires": {
                    "mkdirp": "^0.5.1"
                  }
                }
              }
            },
            "standard-engine": {
              "version": "9.0.0",
                "resolved": "https://registry.npmjs.org/standard-engine/-/standard-engine-9.0.0.tgz",
                "integrity": "sha512-ZfNfCWZ2Xq67VNvKMPiVMKHnMdvxYzvZkf1AH8/cw2NLDBm5LRsxMqvEJpsjLI/dUosZ3Z1d6JlHDp5rAvvk2w==",
                "dev": true,
                "requires": {
                "deglob": "^2.1.0",
                  "get-stdin": "^6.0.0",
                  "minimist": "^1.1.0",
                  "pkg-conf": "^2.0.0"
              },
              "dependencies": {
                "get-stdin": {
                  "version": "6.0.0",
                    "resolved": "https://registry.npmjs.org/get-stdin/-/get-stdin-6.0.0.tgz",
                    "integrity": "sha512-jp4tHawyV7+fkkSKyvjuLZswblUtz+SQKzSWnBbii16BuZksJlU1wuBYXY75r+duh/llF1ur6oNwi+2ZzjKZ7g==",
                    "dev": true
                }
              }
            },
            "static-extend": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/static-extend/-/static-extend-0.1.2.tgz",
                "integrity": "sha1-YICcOcv/VTNyJv1eC1IPNB8ftcY=",
                "requires": {
                "define-property": "^0.2.5",
                  "object-copy": "^0.1.0"
              },
              "dependencies": {
                "define-property": {
                  "version": "0.2.5",
                    "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
                    "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
                    "requires": {
                    "is-descriptor": "^0.1.0"
                  }
                }
              }
            },
            "statuses": {
              "version": "1.5.0",
                "resolved": "https://registry.npmjs.org/statuses/-/statuses-1.5.0.tgz",
                "integrity": "sha1-Fhx9rBd2Wf2YEfQ3cfqZOBR4Yow="
            },
            "stdout-stream": {
              "version": "1.4.1",
                "resolved": "https://registry.npmjs.org/stdout-stream/-/stdout-stream-1.4.1.tgz",
                "integrity": "sha512-j4emi03KXqJWcIeF8eIXkjMFN1Cmb8gUlDYGeBALLPo5qdyTfA9bOtl8m33lRoC+vFMkP3gl0WsDr6+gzxbbTA==",
                "requires": {
                "readable-stream": "^2.0.1"
              }
            },
            "stealthy-require": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/stealthy-require/-/stealthy-require-1.1.1.tgz",
                "integrity": "sha1-NbCYdbT/SfJqd35QmzCQoyJr8ks="
            },
            "stream-browserify": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-2.0.2.tgz",
                "integrity": "sha512-nX6hmklHs/gr2FuxYDltq8fJA1GDlxKQCz8O/IM4atRqBH8OORmBNgfvW5gG10GT/qQ9u0CzIvr2X5Pkt6ntqg==",
                "requires": {
                "inherits": "~2.0.1",
                  "readable-stream": "^2.0.2"
              }
            },
            "stream-each": {
              "version": "1.2.3",
                "resolved": "https://registry.npmjs.org/stream-each/-/stream-each-1.2.3.tgz",
                "integrity": "sha512-vlMC2f8I2u/bZGqkdfLQW/13Zihpej/7PmSiMQsbYddxuTsJp8vRe2x2FvVExZg7FaOds43ROAuFJwPR4MTZLw==",
                "requires": {
                "end-of-stream": "^1.1.0",
                  "stream-shift": "^1.0.0"
              }
            },
            "stream-http": {
              "version": "2.8.3",
                "resolved": "https://registry.npmjs.org/stream-http/-/stream-http-2.8.3.tgz",
                "integrity": "sha512-+TSkfINHDo4J+ZobQLWiMouQYB+UVYFttRA94FpEzzJ7ZdqcL4uUUQ7WkdkI4DSozGmgBUE/a47L+38PenXhUw==",
                "requires": {
                "builtin-status-codes": "^3.0.0",
                  "inherits": "^2.0.1",
                  "readable-stream": "^2.3.6",
                  "to-arraybuffer": "^1.0.0",
                  "xtend": "^4.0.0"
              }
            },
            "stream-shift": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
                "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
            },
            "strict-uri-encode": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/strict-uri-encode/-/strict-uri-encode-1.1.0.tgz",
                "integrity": "sha1-J5siXfHVgrH1TmWt3UNS4Y+qBxM="
            },
            "string-convert": {
              "version": "0.2.1",
                "resolved": "https://registry.npmjs.org/string-convert/-/string-convert-0.2.1.tgz",
                "integrity": "sha1-aYLMMEn7tM2F+LJFaLnZvznu/5c="
            },
            "string-length": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/string-length/-/string-length-2.0.0.tgz",
                "integrity": "sha1-1A27aGo6zpYMHP/KVivyxF+DY+0=",
                "requires": {
                "astral-regex": "^1.0.0",
                  "strip-ansi": "^4.0.0"
              },
              "dependencies": {
                "ansi-regex": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
                    "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
                },
                "strip-ansi": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
                    "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
                    "requires": {
                    "ansi-regex": "^3.0.0"
                  }
                }
              }
            },
            "string-width": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
                "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
                "requires": {
                "is-fullwidth-code-point": "^2.0.0",
                  "strip-ansi": "^4.0.0"
              },
              "dependencies": {
                "ansi-regex": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
                    "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
                },
                "strip-ansi": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
                    "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
                    "requires": {
                    "ansi-regex": "^3.0.0"
                  }
                }
              }
            },
            "string.prototype.trimleft": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/string.prototype.trimleft/-/string.prototype.trimleft-2.1.1.tgz",
                "integrity": "sha512-iu2AGd3PuP5Rp7x2kEZCrB2Nf41ehzh+goo8TV7z8/XDBbsvc6HQIlUl9RjkZ4oyrW1XM5UwlGl1oVEaDjg6Ag==",
                "requires": {
                "define-properties": "^1.1.3",
                  "function-bind": "^1.1.1"
              }
            },
            "string.prototype.trimright": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/string.prototype.trimright/-/string.prototype.trimright-2.1.1.tgz",
                "integrity": "sha512-qFvWL3/+QIgZXVmJBfpHmxLB7xsUXz6HsUmP8+5dRaC3Q7oKUv9Vo6aMCRZC1smrtyECFsIT30PqBJ1gTjAs+g==",
                "requires": {
                "define-properties": "^1.1.3",
                  "function-bind": "^1.1.1"
              }
            },
            "string_decoder": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
                "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
                "requires": {
                "safe-buffer": "~5.1.0"
              }
            },
            "stringify-object": {
              "version": "3.3.0",
                "resolved": "https://registry.npmjs.org/stringify-object/-/stringify-object-3.3.0.tgz",
                "integrity": "sha512-rHqiFh1elqCQ9WPLIC8I0Q/g/wj5J1eMkyoiD6eoQApWHP0FtlK7rqnhmabL5VUY9JQCcqwwvlOaSuutekgyrw==",
                "requires": {
                "get-own-enumerable-property-symbols": "^3.0.0",
                  "is-obj": "^1.0.1",
                  "is-regexp": "^1.0.0"
              }
            },
            "strip-ansi": {
              "version": "5.2.0",
                "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
                "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
                "requires": {
                "ansi-regex": "^4.1.0"
              },
              "dependencies": {
                "ansi-regex": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
                    "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg=="
                }
              }
            },
            "strip-bom": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
                "integrity": "sha1-IzTBjpx1n3vdVv3vfprj1YjmjtM="
            },
            "strip-comments": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/strip-comments/-/strip-comments-1.0.2.tgz",
                "integrity": "sha512-kL97alc47hoyIQSV165tTt9rG5dn4w1dNnBhOQ3bOU1Nc1hel09jnXANaHJ7vzHLd4Ju8kseDGzlev96pghLFw==",
                "requires": {
                "babel-extract-comments": "^1.0.0",
                  "babel-plugin-transform-object-rest-spread": "^6.26.0"
              }
            },
            "strip-eof": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/strip-eof/-/strip-eof-1.0.0.tgz",
                "integrity": "sha1-u0P/VZim6wXYm1n80SnJgzE2Br8="
            },
            "strip-indent": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/strip-indent/-/strip-indent-1.0.1.tgz",
                "integrity": "sha1-DHlipq3vp7vUrDZkYKY4VSrhoKI=",
                "requires": {
                "get-stdin": "^4.0.1"
              }
            },
            "strip-json-comments": {
              "version": "2.0.1",
                "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
                "integrity": "sha1-PFMZQukIwml8DsNEhYwobHygpgo=",
                "dev": true
            },
            "style-loader": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/style-loader/-/style-loader-1.0.0.tgz",
                "integrity": "sha512-B0dOCFwv7/eY31a5PCieNwMgMhVGFe9w+rh7s/Bx8kfFkrth9zfTZquoYvdw8URgiqxObQKcpW51Ugz1HjfdZw==",
                "requires": {
                "loader-utils": "^1.2.3",
                  "schema-utils": "^2.0.1"
              }
            },
            "styled-components": {
              "version": "4.4.0",
                "resolved": "https://registry.npmjs.org/styled-components/-/styled-components-4.4.0.tgz",
                "integrity": "sha512-xQ6vTI/0zNjZ1BBDRxyjvBddrxhQ3DxjeCdaLM1lSn5FDnkTOQgRkmWvcUiTajqc5nJqKVl+7sUioMqktD0+Zw==",
                "requires": {
                "@babel/helper-module-imports": "^7.0.0",
                  "@babel/traverse": "^7.0.0",
                  "@emotion/is-prop-valid": "^0.8.1",
                  "@emotion/unitless": "^0.7.0",
                  "babel-plugin-styled-components": ">= 1",
                  "css-to-react-native": "^2.2.2",
                  "memoize-one": "^5.0.0",
                  "merge-anything": "^2.2.4",
                  "prop-types": "^15.5.4",
                  "react-is": "^16.6.0",
                  "stylis": "^3.5.0",
                  "stylis-rule-sheet": "^0.0.10",
                  "supports-color": "^5.5.0"
              }
            },
            "stylehacks": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/stylehacks/-/stylehacks-4.0.3.tgz",
                "integrity": "sha512-7GlLk9JwlElY4Y6a/rmbH2MhVlTyVmiJd1PfTCqFaIBEGMYNsrO/v3SeGTdhBThLg4Z+NbOk/qFMwCa+J+3p/g==",
                "requires": {
                "browserslist": "^4.0.0",
                  "postcss": "^7.0.0",
                  "postcss-selector-parser": "^3.0.0"
              },
              "dependencies": {
                "postcss-selector-parser": {
                  "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-3.1.1.tgz",
                    "integrity": "sha1-T4dfSvsMllc9XPTXQBGu4lCn6GU=",
                    "requires": {
                    "dot-prop": "^4.1.1",
                      "indexes-of": "^1.0.1",
                      "uniq": "^1.0.1"
                  }
                }
              }
            },
            "stylis": {
              "version": "3.5.4",
                "resolved": "https://registry.npmjs.org/stylis/-/stylis-3.5.4.tgz",
                "integrity": "sha512-8/3pSmthWM7lsPBKv7NXkzn2Uc9W7NotcwGNpJaa3k7WMM1XDCA4MgT5k/8BIexd5ydZdboXtU90XH9Ec4Bv/Q=="
            },
            "stylis-rule-sheet": {
              "version": "0.0.10",
                "resolved": "https://registry.npmjs.org/stylis-rule-sheet/-/stylis-rule-sheet-0.0.10.tgz",
                "integrity": "sha512-nTbZoaqoBnmK+ptANthb10ZRZOGC+EmTLLUxeYIuHNkEKcmKgXX1XWKkUBT2Ac4es3NybooPe0SmvKdhKJZAuw=="
            },
            "supports-color": {
              "version": "5.5.0",
                "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
                "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
                "requires": {
                "has-flag": "^3.0.0"
              }
            },
            "svg-parser": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/svg-parser/-/svg-parser-2.0.2.tgz",
                "integrity": "sha512-1gtApepKFweigFZj3sGO8KT8LvVZK8io146EzXrpVuWCDAbISz/yMucco3hWTkpZNoPabM+dnMOpy6Swue68Zg=="
            },
            "svgo": {
              "version": "1.3.2",
                "resolved": "https://registry.npmjs.org/svgo/-/svgo-1.3.2.tgz",
                "integrity": "sha512-yhy/sQYxR5BkC98CY7o31VGsg014AKLEPxdfhora76l36hD9Rdy5NZA/Ocn6yayNPgSamYdtX2rFJdcv07AYVw==",
                "requires": {
                "chalk": "^2.4.1",
                  "coa": "^2.0.2",
                  "css-select": "^2.0.0",
                  "css-select-base-adapter": "^0.1.1",
                  "css-tree": "1.0.0-alpha.37",
                  "csso": "^4.0.2",
                  "js-yaml": "^3.13.1",
                  "mkdirp": "~0.5.1",
                  "object.values": "^1.1.0",
                  "sax": "~1.2.4",
                  "stable": "^0.1.8",
                  "unquote": "~1.1.1",
                  "util.promisify": "~1.0.0"
              }
            },
            "symbol-observable": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/symbol-observable/-/symbol-observable-1.2.0.tgz",
                "integrity": "sha512-e900nM8RRtGhlV36KGEU9k65K3mPb1WV70OdjfxlG2EAuM1noi/E/BaW/uMhL7bPEssK8QV57vN3esixjUvcXQ=="
            },
            "symbol-tree": {
              "version": "3.2.4",
                "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
                "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw=="
            },
            "table": {
              "version": "5.4.0",
                "resolved": "https://registry.npmjs.org/table/-/table-5.4.0.tgz",
                "integrity": "sha512-nHFDrxmbrkU7JAFKqKbDJXfzrX2UBsWmrieXFTGxiI5e4ncg3VqsZeI4EzNmX0ncp4XNGVeoxIWJXfCIXwrsvw==",
                "requires": {
                "ajv": "^6.9.1",
                  "lodash": "^4.17.11",
                  "slice-ansi": "^2.1.0",
                  "string-width": "^3.0.0"
              },
              "dependencies": {
                "emoji-regex": {
                  "version": "7.0.3",
                    "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
                    "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA=="
                },
                "string-width": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
                    "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
                    "requires": {
                    "emoji-regex": "^7.0.1",
                      "is-fullwidth-code-point": "^2.0.0",
                      "strip-ansi": "^5.1.0"
                  }
                }
              }
            },
            "tapable": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/tapable/-/tapable-1.1.3.tgz",
                "integrity": "sha512-4WK/bYZmj8xLr+HUCODHGF1ZFzsYffasLUgEiMBY4fgtltdO6B4WJtlSbPaDTLpYTcGVwM2qLnFTICEcNxs3kA=="
            },
            "tar": {
              "version": "2.2.2",
                "resolved": "https://registry.npmjs.org/tar/-/tar-2.2.2.tgz",
                "integrity": "sha512-FCEhQ/4rE1zYv9rYXJw/msRqsnmlje5jHP6huWeBZ704jUTy02c5AZyWujpMR1ax6mVw9NyJMfuK2CMDWVIfgA==",
                "requires": {
                "block-stream": "*",
                  "fstream": "^1.0.12",
                  "inherits": "2"
              }
            },
            "terser": {
              "version": "4.6.2",
                "resolved": "https://registry.npmjs.org/terser/-/terser-4.6.2.tgz",
                "integrity": "sha512-6FUjJdY2i3WZAtYBtnV06OOcOfzl+4hSKYE9wgac8rkLRBToPDDrBB2AcHwQD/OKDxbnvhVy2YgOPWO2SsKWqg==",
                "requires": {
                "commander": "^2.20.0",
                  "source-map": "~0.6.1",
                  "source-map-support": "~0.5.12"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                },
                "source-map-support": {
                  "version": "0.5.16",
                    "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.16.tgz",
                    "integrity": "sha512-efyLRJDr68D9hBBNIPWFjhpFzURh+KJykQwvMyW5UiZzYwoF6l4YMMDIJJEyFWxWCqfyxLzz6tSfUFR+kXXsVQ==",
                    "requires": {
                    "buffer-from": "^1.0.0",
                      "source-map": "^0.6.0"
                  }
                }
              }
            },
            "terser-webpack-plugin": {
              "version": "2.2.1",
                "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-2.2.1.tgz",
                "integrity": "sha512-jwdauV5Al7zopR6OAYvIIRcxXCSvLjZjr7uZE8l2tIWb/ryrGN48sJftqGf5k9z09tWhajx53ldp0XPI080YnA==",
                "requires": {
                "cacache": "^13.0.1",
                  "find-cache-dir": "^3.0.0",
                  "jest-worker": "^24.9.0",
                  "schema-utils": "^2.5.0",
                  "serialize-javascript": "^2.1.0",
                  "source-map": "^0.6.1",
                  "terser": "^4.3.9",
                  "webpack-sources": "^1.4.3"
              },
              "dependencies": {
                "find-cache-dir": {
                  "version": "3.2.0",
                    "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-3.2.0.tgz",
                    "integrity": "sha512-1JKclkYYsf1q9WIJKLZa9S9muC+08RIjzAlLrK4QcYLJMS6mk9yombQ9qf+zJ7H9LS800k0s44L4sDq9VYzqyg==",
                    "requires": {
                    "commondir": "^1.0.1",
                      "make-dir": "^3.0.0",
                      "pkg-dir": "^4.1.0"
                  }
                },
                "find-up": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
                    "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
                    "requires": {
                    "locate-path": "^5.0.0",
                      "path-exists": "^4.0.0"
                  }
                },
                "locate-path": {
                  "version": "5.0.0",
                    "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
                    "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
                    "requires": {
                    "p-locate": "^4.1.0"
                  }
                },
                "make-dir": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.0.0.tgz",
                    "integrity": "sha512-grNJDhb8b1Jm1qeqW5R/O63wUo4UXo2v2HMic6YT9i/HBlF93S8jkMgH7yugvY9ABDShH4VZMn8I+U8+fCNegw==",
                    "requires": {
                    "semver": "^6.0.0"
                  }
                },
                "p-locate": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
                    "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
                    "requires": {
                    "p-limit": "^2.2.0"
                  }
                },
                "path-exists": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
                    "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w=="
                },
                "pkg-dir": {
                  "version": "4.2.0",
                    "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-4.2.0.tgz",
                    "integrity": "sha512-HRDzbaKjC+AOWVXxAU/x54COGeIv9eb+6CkDSQoNTt4XyWoIJvuPsXizxu/Fr23EiekbtZwmh1IcIG/l/a10GQ==",
                    "requires": {
                    "find-up": "^4.0.0"
                  }
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "test-exclude": {
              "version": "5.2.3",
                "resolved": "https://registry.npmjs.org/test-exclude/-/test-exclude-5.2.3.tgz",
                "integrity": "sha512-M+oxtseCFO3EDtAaGH7iiej3CBkzXqFMbzqYAACdzKui4eZA+pq3tZEwChvOdNfa7xxy8BfbmgJSIr43cC/+2g==",
                "requires": {
                "glob": "^7.1.3",
                  "minimatch": "^3.0.4",
                  "read-pkg-up": "^4.0.0",
                  "require-main-filename": "^2.0.0"
              },
              "dependencies": {
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                },
                "path-type": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/path-type/-/path-type-3.0.0.tgz",
                    "integrity": "sha512-T2ZUsdZFHgA3u4e5PfPbjd7HDDpxPnQb5jN0SrDsjNSuVXHJqtwTnWqG0B1jZrgmJ/7lj1EmVIByWt1gxGkWvg==",
                    "requires": {
                    "pify": "^3.0.0"
                  }
                },
                "pify": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
                    "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY="
                },
                "read-pkg": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-3.0.0.tgz",
                    "integrity": "sha1-nLxoaXj+5l0WwA4rGcI3/Pbjg4k=",
                    "requires": {
                    "load-json-file": "^4.0.0",
                      "normalize-package-data": "^2.3.2",
                      "path-type": "^3.0.0"
                  }
                },
                "read-pkg-up": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-4.0.0.tgz",
                    "integrity": "sha512-6etQSH7nJGsK0RbG/2TeDzZFa8shjQ1um+SwQQ5cwKy0dhSXdOncEhb1CPpvQG4h7FyOV6EB6YlV0yJvZQNAkA==",
                    "requires": {
                    "find-up": "^3.0.0",
                      "read-pkg": "^3.0.0"
                  }
                },
                "require-main-filename": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
                    "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
                }
              }
            },
            "text-table": {
              "version": "0.2.0",
                "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
                "integrity": "sha1-f17oI66AUgfACvLfSoTsP8+lcLQ="
            },
            "throat": {
              "version": "4.1.0",
                "resolved": "https://registry.npmjs.org/throat/-/throat-4.1.0.tgz",
                "integrity": "sha1-iQN8vJLFarGJJua6TLsgDhVnKmo="
            },
            "through": {
              "version": "2.3.8",
                "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
                "integrity": "sha1-DdTJ/6q8NXlgsbckEV1+Doai4fU="
            },
            "through2": {
              "version": "2.0.5",
                "resolved": "https://registry.npmjs.org/through2/-/through2-2.0.5.tgz",
                "integrity": "sha512-/mrRod8xqpA+IHSLyGCQ2s8SPHiCDEeQJSep1jqLYeEUClOFG2Qsh+4FU6G9VeqpZnGW/Su8LQGc4YKni5rYSQ==",
                "requires": {
                "readable-stream": "~2.3.6",
                  "xtend": "~4.0.1"
              }
            },
            "thunky": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/thunky/-/thunky-1.1.0.tgz",
                "integrity": "sha512-eHY7nBftgThBqOyHGVN+l8gF0BucP09fMo0oO/Lb0w1OF80dJv+lDVpXG60WMQvkcxAkNybKsrEIE3ZtKGmPrA=="
            },
            "timers-browserify": {
              "version": "2.0.11",
                "resolved": "https://registry.npmjs.org/timers-browserify/-/timers-browserify-2.0.11.tgz",
                "integrity": "sha512-60aV6sgJ5YEbzUdn9c8kYGIqOubPoUdqQCul3SBAsRCZ40s6Y5cMcrW4dt3/k/EsbLVJNl9n6Vz3fTc+k2GeKQ==",
                "requires": {
                "setimmediate": "^1.0.4"
              }
            },
            "timsort": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/timsort/-/timsort-0.3.0.tgz",
                "integrity": "sha1-QFQRqOfmM5/mTbmiNN4R3DHgK9Q="
            },
            "tiny-invariant": {
              "version": "1.0.6",
                "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.0.6.tgz",
                "integrity": "sha512-FOyLWWVjG+aC0UqG76V53yAWdXfH8bO6FNmyZOuUrzDzK8DI3/JRY25UD7+g49JWM1LXwymsKERB+DzI0dTEQA=="
            },
            "tiny-warning": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/tiny-warning/-/tiny-warning-1.0.3.tgz",
                "integrity": "sha512-lBN9zLN/oAf68o3zNXYrdCt1kP8WsiGW8Oo2ka41b2IM5JL/S1CTyX1rW0mb/zSuJun0ZUrDxx4sqvYS2FWzPA=="
            },
            "tinycolor2": {
              "version": "1.4.1",
                "resolved": "https://registry.npmjs.org/tinycolor2/-/tinycolor2-1.4.1.tgz",
                "integrity": "sha1-9PrTM0R7wLB9TcjpIJ2POaisd+g="
            },
            "tmp": {
              "version": "0.0.33",
                "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.0.33.tgz",
                "integrity": "sha512-jRCJlojKnZ3addtTOjdIqoRuPEKBvNXcGYqzO6zWZX8KfKEpnGY5jfggJQ3EjKuu8D4bJRr0y+cYJFmYbImXGw==",
                "requires": {
                "os-tmpdir": "~1.0.2"
              }
            },
            "tmpl": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/tmpl/-/tmpl-1.0.4.tgz",
                "integrity": "sha1-I2QN17QtAEM5ERQIIOXPRA5SHdE="
            },
            "to-arraybuffer": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/to-arraybuffer/-/to-arraybuffer-1.0.1.tgz",
                "integrity": "sha1-fSKbH8xjfkZsoIEYCDanqr/4P0M="
            },
            "to-fast-properties": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
                "integrity": "sha1-3F5pjL0HkmW8c+A3doGk5Og/YW4="
            },
            "to-object-path": {
              "version": "0.3.0",
                "resolved": "https://registry.npmjs.org/to-object-path/-/to-object-path-0.3.0.tgz",
                "integrity": "sha1-KXWIt7Dn4KwI4E5nL4XB9JmeF68=",
                "requires": {
                "kind-of": "^3.0.2"
              }
            },
            "to-regex": {
              "version": "3.0.2",
                "resolved": "https://registry.npmjs.org/to-regex/-/to-regex-3.0.2.tgz",
                "integrity": "sha512-FWtleNAtZ/Ki2qtqej2CXTOayOH9bHDQF+Q48VpWyDXjbYxA4Yz8iDB31zXOBUlOHHKidDbqGVrTUvQMPmBGBw==",
                "requires": {
                "define-property": "^2.0.2",
                  "extend-shallow": "^3.0.2",
                  "regex-not": "^1.0.2",
                  "safe-regex": "^1.1.0"
              }
            },
            "to-regex-range": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-2.1.1.tgz",
                "integrity": "sha1-fIDBe53+vlmeJzZ+DU3VWQFB2zg=",
                "requires": {
                "is-number": "^3.0.0",
                  "repeat-string": "^1.6.1"
              }
            },
            "toggle-selection": {
              "version": "1.0.6",
                "resolved": "https://registry.npmjs.org/toggle-selection/-/toggle-selection-1.0.6.tgz",
                "integrity": "sha1-bkWxJj8gF/oKzH2J14sVuL932jI="
            },
            "toidentifier": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.0.tgz",
                "integrity": "sha512-yaOH/Pk/VEhBWWTlhI+qXxDFXlejDGcQipMlyxda9nthulaxLZUNcUqFxokp0vcYnvteJln5FNQDRrxj3YcbVw=="
            },
            "tough-cookie": {
              "version": "2.4.3",
                "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-2.4.3.tgz",
                "integrity": "sha512-Q5srk/4vDM54WJsJio3XNn6K2sCG+CQ8G5Wz6bZhRZoAe/+TxjWB/GlFAnYEbkYVlON9FMk/fE3h2RLpPXo4lQ==",
                "requires": {
                "psl": "^1.1.24",
                  "punycode": "^1.4.1"
              },
              "dependencies": {
                "punycode": {
                  "version": "1.4.1",
                    "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
                    "integrity": "sha1-wNWmOycYgArY4esPpSachN1BhF4="
                }
              }
            },
            "tr46": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/tr46/-/tr46-1.0.1.tgz",
                "integrity": "sha1-qLE/1r/SSJUZZ0zN5VujaTtwbQk=",
                "requires": {
                "punycode": "^2.1.0"
              }
            },
            "trim-newlines": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/trim-newlines/-/trim-newlines-1.0.0.tgz",
                "integrity": "sha1-WIeWa7WCpFA6QetST301ARgVphM="
            },
            "trim-right": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/trim-right/-/trim-right-1.0.1.tgz",
                "integrity": "sha1-yy4SAwZ+DI3h9hQJS5/kVwTqYAM=",
                "dev": true
            },
            "true-case-path": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/true-case-path/-/true-case-path-1.0.3.tgz",
                "integrity": "sha512-m6s2OdQe5wgpFMC+pAJ+q9djG82O2jcHPOI6RNg1yy9rCYR+WD6Nbpl32fDpfC56nirdRy+opFa/Vk7HYhqaew==",
                "requires": {
                "glob": "^7.1.2"
              }
            },
            "ts-pnp": {
              "version": "1.1.5",
                "resolved": "https://registry.npmjs.org/ts-pnp/-/ts-pnp-1.1.5.tgz",
                "integrity": "sha512-ti7OGMOUOzo66wLF3liskw6YQIaSsBgc4GOAlWRnIEj8htCxJUxskanMUoJOD6MDCRAXo36goXJZch+nOS0VMA=="
            },
            "tslib": {
              "version": "1.9.3",
                "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.9.3.tgz",
                "integrity": "sha512-4krF8scpejhaOgqzBEcGM7yDIEfi0/8+8zDRZhNZZ2kjmHJ4hv3zCbQWxoJGz1iw5U0Jl0nma13xzHXcncMavQ=="
            },
            "tsutils": {
              "version": "3.17.1",
                "resolved": "https://registry.npmjs.org/tsutils/-/tsutils-3.17.1.tgz",
                "integrity": "sha512-kzeQ5B8H3w60nFY2g8cJIuH7JDpsALXySGtwGJ0p2LSjLgay3NdIpqq5SoOBe46bKDW2iq25irHCr8wjomUS2g==",
                "requires": {
                "tslib": "^1.8.1"
              }
            },
            "tty-browserify": {
              "version": "0.0.0",
                "resolved": "https://registry.npmjs.org/tty-browserify/-/tty-browserify-0.0.0.tgz",
                "integrity": "sha1-oVe6QC2iTpv5V/mqadUk7tQpAaY="
            },
            "tunnel-agent": {
              "version": "0.6.0",
                "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
                "integrity": "sha1-J6XeoGs2sEoKmWZ3SykIaPD8QP0=",
                "requires": {
                "safe-buffer": "^5.0.1"
              }
            },
            "tweetnacl": {
              "version": "0.14.5",
                "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-0.14.5.tgz",
                "integrity": "sha1-WuaBd/GS1EViadEIr6k/+HQ/T2Q="
            },
            "type": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/type/-/type-1.2.0.tgz",
                "integrity": "sha512-+5nt5AAniqsCnu2cEQQdpzCAh33kVx8n0VoFidKpB1dVVLAN/F+bgVOqOJqOnEnrhp222clB5p3vUlD+1QAnfg=="
            },
            "type-check": {
              "version": "0.3.2",
                "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
                "integrity": "sha1-WITKtRLPHTVeP7eE8wgEsrUg23I=",
                "requires": {
                "prelude-ls": "~1.1.2"
              }
            },
            "type-fest": {
              "version": "0.8.1",
                "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.8.1.tgz",
                "integrity": "sha512-4dbzIzqvjtgiM5rw1k5rEHtBANKmdudhGyBEajN01fEyhaAIhsoKNy6y7+IN93IfpFtwY9iqi7kD+xwKhQsNJA=="
            },
            "type-is": {
              "version": "1.6.18",
                "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
                "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
                "requires": {
                "media-typer": "0.3.0",
                  "mime-types": "~2.1.24"
              }
            },
            "typedarray": {
              "version": "0.0.6",
                "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
                "integrity": "sha1-hnrHTjhkGHsdPUfZlqeOxciDB3c="
            },
            "typeface-roboto": {
              "version": "0.0.54",
                "resolved": "https://registry.npmjs.org/typeface-roboto/-/typeface-roboto-0.0.54.tgz",
                "integrity": "sha512-sOFA1FXgP0gOgBYlS6irwq6hHYA370KE3dPlgYEJHL3PJd5X8gQE0RmL79ONif6fL5JZuGDj+rtOrFeOqz5IZQ=="
            },
            "ua-parser-js": {
              "version": "0.7.21",
                "resolved": "https://registry.npmjs.org/ua-parser-js/-/ua-parser-js-0.7.21.tgz",
                "integrity": "sha512-+O8/qh/Qj8CgC6eYBVBykMrNtp5Gebn4dlGD/kKXVkJNDwyrAwSIqwz8CDf+tsAIWVycKcku6gIXJ0qwx/ZXaQ=="
            },
            "uglify-js": {
              "version": "3.4.10",
                "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.4.10.tgz",
                "integrity": "sha512-Y2VsbPVs0FIshJztycsO2SfPk7/KAF/T72qzv9u5EpQ4kB2hQoHlhNQTsNyy6ul7lQtqJN/AoWeS23OzEiEFxw==",
                "requires": {
                "commander": "~2.19.0",
                  "source-map": "~0.6.1"
              },
              "dependencies": {
                "commander": {
                  "version": "2.19.0",
                    "resolved": "https://registry.npmjs.org/commander/-/commander-2.19.0.tgz",
                    "integrity": "sha512-6tvAOO+D6OENvRAh524Dh9jcfKTYDQAqvqezbCW82xj5X0pSrcpxtvRKHLG0yBY6SD7PSDrJaj+0AiOcKVd1Xg=="
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "unicode-canonical-property-names-ecmascript": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/unicode-canonical-property-names-ecmascript/-/unicode-canonical-property-names-ecmascript-1.0.4.tgz",
                "integrity": "sha512-jDrNnXWHd4oHiTZnx/ZG7gtUTVp+gCcTTKr8L0HjlwphROEW3+Him+IpvC+xcJEFegapiMZyZe02CyuOnRmbnQ=="
            },
            "unicode-match-property-ecmascript": {
              "version": "1.0.4",
                "resolved": "https://registry.npmjs.org/unicode-match-property-ecmascript/-/unicode-match-property-ecmascript-1.0.4.tgz",
                "integrity": "sha512-L4Qoh15vTfntsn4P1zqnHulG0LdXgjSO035fEpdtp6YxXhMT51Q6vgM5lYdG/5X3MjS+k/Y9Xw4SFCY9IkR0rg==",
                "requires": {
                "unicode-canonical-property-names-ecmascript": "^1.0.4",
                  "unicode-property-aliases-ecmascript": "^1.0.4"
              }
            },
            "unicode-match-property-value-ecmascript": {
              "version": "1.1.0",
                "resolved": "https://registry.npmjs.org/unicode-match-property-value-ecmascript/-/unicode-match-property-value-ecmascript-1.1.0.tgz",
                "integrity": "sha512-hDTHvaBk3RmFzvSl0UVrUmC3PuW9wKVnpoUDYH0JDkSIovzw+J5viQmeYHxVSBptubnr7PbH2e0fnpDRQnQl5g=="
            },
            "unicode-property-aliases-ecmascript": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/unicode-property-aliases-ecmascript/-/unicode-property-aliases-ecmascript-1.0.5.tgz",
                "integrity": "sha512-L5RAqCfXqAwR3RriF8pM0lU0w4Ryf/GgzONwi6KnL1taJQa7x1TCxdJnILX59WIGOwR57IVxn7Nej0fz1Ny6fw=="
            },
            "union-value": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",
                "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",
                "requires": {
                "arr-union": "^3.1.0",
                  "get-value": "^2.0.6",
                  "is-extendable": "^0.1.1",
                  "set-value": "^2.0.1"
              }
            },
            "uniq": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/uniq/-/uniq-1.0.1.tgz",
                "integrity": "sha1-sxxa6CVIRKOoKBVBzisEuGWnNP8="
            },
            "uniqs": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/uniqs/-/uniqs-2.0.0.tgz",
                "integrity": "sha1-/+3ks2slKQaW5uFl1KWe25mOawI="
            },
            "unique-filename": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/unique-filename/-/unique-filename-1.1.1.tgz",
                "integrity": "sha512-Vmp0jIp2ln35UTXuryvjzkjGdRyf9b2lTXuSYUiPmzRcl3FDtYqAwOnTJkAngD9SWhnoJzDbTKwaOrZ+STtxNQ==",
                "requires": {
                "unique-slug": "^2.0.0"
              }
            },
            "unique-slug": {
              "version": "2.0.2",
                "resolved": "https://registry.npmjs.org/unique-slug/-/unique-slug-2.0.2.tgz",
                "integrity": "sha512-zoWr9ObaxALD3DOPfjPSqxt4fnZiWblxHIgeWqW8x7UqDzEtHEQLzji2cuJYQFCU6KmoJikOYAZlrTHHebjx2w==",
                "requires": {
                "imurmurhash": "^0.1.4"
              }
            },
            "universalify": {
              "version": "0.1.2",
                "resolved": "https://registry.npmjs.org/universalify/-/universalify-0.1.2.tgz",
                "integrity": "sha512-rBJeI5CXAlmy1pV+617WB9J63U6XcazHHF2f2dbJix4XzpUF0RS3Zbj0FGIOCAva5P/d/GBOYaACQ1w+0azUkg=="
            },
            "unpipe": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
                "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw="
            },
            "unquote": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/unquote/-/unquote-1.1.1.tgz",
                "integrity": "sha1-j97XMk7G6IoP+LkF58CYzcCG1UQ="
            },
            "unset-value": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/unset-value/-/unset-value-1.0.0.tgz",
                "integrity": "sha1-g3aHP30jNRef+x5vw6jtDfyKtVk=",
                "requires": {
                "has-value": "^0.3.1",
                  "isobject": "^3.0.0"
              },
              "dependencies": {
                "has-value": {
                  "version": "0.3.1",
                    "resolved": "https://registry.npmjs.org/has-value/-/has-value-0.3.1.tgz",
                    "integrity": "sha1-ex9YutpiyoJ+wKIHgCVlSEWZXh8=",
                    "requires": {
                    "get-value": "^2.0.3",
                      "has-values": "^0.1.4",
                      "isobject": "^2.0.0"
                  },
                  "dependencies": {
                    "isobject": {
                      "version": "2.1.0",
                        "resolved": "https://registry.npmjs.org/isobject/-/isobject-2.1.0.tgz",
                        "integrity": "sha1-8GVWEJaj8dou9GJy+BXIQNh+DIk=",
                        "requires": {
                        "isarray": "1.0.0"
                      }
                    }
                  }
                },
                "has-values": {
                  "version": "0.1.4",
                    "resolved": "https://registry.npmjs.org/has-values/-/has-values-0.1.4.tgz",
                    "integrity": "sha1-bWHeldkd/Km5oCCJrThL/49it3E="
                }
              }
            },
            "upath": {
              "version": "1.2.0",
                "resolved": "https://registry.npmjs.org/upath/-/upath-1.2.0.tgz",
                "integrity": "sha512-aZwGpamFO61g3OlfT7OQCHqhGnW43ieH9WZeP7QxN/G/jS4jfqUkZxoryvJgVPEcrl5NL/ggHsSmLMHuH64Lhg=="
            },
            "upper-case": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/upper-case/-/upper-case-1.1.3.tgz",
                "integrity": "sha1-9rRQHC7EzdJrp4vnIilh3ndiFZg="
            },
            "uri-js": {
              "version": "4.2.2",
                "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.2.2.tgz",
                "integrity": "sha512-KY9Frmirql91X2Qgjry0Wd4Y+YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4+0Baa5idK2ZQuELRwPznQ==",
                "requires": {
                "punycode": "^2.1.0"
              }
            },
            "urix": {
              "version": "0.1.0",
                "resolved": "https://registry.npmjs.org/urix/-/urix-0.1.0.tgz",
                "integrity": "sha1-2pN/emLiH+wf0Y1Js1wpNQZ6bHI="
            },
            "url": {
              "version": "0.11.0",
                "resolved": "https://registry.npmjs.org/url/-/url-0.11.0.tgz",
                "integrity": "sha1-ODjpfPxgUh63PFJajlW/3Z4uKPE=",
                "requires": {
                "punycode": "1.3.2",
                  "querystring": "0.2.0"
              },
              "dependencies": {
                "punycode": {
                  "version": "1.3.2",
                    "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.3.2.tgz",
                    "integrity": "sha1-llOgNvt8HuQjQvIyXM7v6jkmxI0="
                }
              }
            },
            "url-loader": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/url-loader/-/url-loader-2.3.0.tgz",
                "integrity": "sha512-goSdg8VY+7nPZKUEChZSEtW5gjbS66USIGCeSJ1OVOJ7Yfuh/36YxCwMi5HVEJh6mqUYOoy3NJ0vlOMrWsSHog==",
                "requires": {
                "loader-utils": "^1.2.3",
                  "mime": "^2.4.4",
                  "schema-utils": "^2.5.0"
              }
            },
            "url-parse": {
              "version": "1.4.7",
                "resolved": "https://registry.npmjs.org/url-parse/-/url-parse-1.4.7.tgz",
                "integrity": "sha512-d3uaVyzDB9tQoSXFvuSUNFibTd9zxd2bkVrDRvF5TmvWWQwqE4lgYJ5m+x1DbecWkw+LK4RNl2CU1hHuOKPVlg==",
                "requires": {
                "querystringify": "^2.1.1",
                  "requires-port": "^1.0.0"
              }
            },
            "use": {
              "version": "3.1.1",
                "resolved": "https://registry.npmjs.org/use/-/use-3.1.1.tgz",
                "integrity": "sha512-cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ/gGpj7vbvFrAY/eIioQ6Dw23KjZhYgiIo8HOs1nQ2vr/oQ=="
            },
            "user-home": {
              "version": "1.1.1",
                "resolved": "https://registry.npmjs.org/user-home/-/user-home-1.1.1.tgz",
                "integrity": "sha1-K1viOjK2Onyd640PKNSFcko98ZA=",
                "dev": true
            },
            "util": {
              "version": "0.10.3",
                "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
                "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
                "requires": {
                "inherits": "2.0.1"
              },
              "dependencies": {
                "inherits": {
                  "version": "2.0.1",
                    "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
                    "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE="
                }
              }
            },
            "util-deprecate": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
                "integrity": "sha1-RQ1Nyfpw3nMnYvvS1KKJgUGaDM8="
            },
            "util.promisify": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/util.promisify/-/util.promisify-1.0.0.tgz",
                "integrity": "sha512-i+6qA2MPhvoKLuxnJNpXAGhg7HphQOSUq2LKMZD0m15EiskXUkMvKdF4Uui0WYeCUGea+o2cw/ZuwehtfsrNkA==",
                "requires": {
                "define-properties": "^1.1.2",
                  "object.getownpropertydescriptors": "^2.0.3"
              }
            },
            "utila": {
              "version": "0.4.0",
                "resolved": "https://registry.npmjs.org/utila/-/utila-0.4.0.tgz",
                "integrity": "sha1-ihagXURWV6Oupe7MWxKk+lN5dyw="
            },
            "utils-merge": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
                "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM="
            },
            "uuid": {
              "version": "3.3.3",
                "resolved": "https://registry.npmjs.org/uuid/-/uuid-3.3.3.tgz",
                "integrity": "sha512-pW0No1RGHgzlpHJO1nsVrHKpOEIxkGg1xB+v0ZmdNH5OAeAwzAVrCnI2/6Mtx+Uys6iaylxa+D3g4j63IKKjSQ=="
            },
            "v8-compile-cache": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/v8-compile-cache/-/v8-compile-cache-2.1.0.tgz",
                "integrity": "sha512-usZBT3PW+LOjM25wbqIlZwPeJV+3OSz3M1k1Ws8snlW39dZyYL9lOGC5FgPVHfk0jKmjiDV8Z0mIbVQPiwFs7g=="
            },
            "v8flags": {
              "version": "2.1.1",
                "resolved": "https://registry.npmjs.org/v8flags/-/v8flags-2.1.1.tgz",
                "integrity": "sha1-qrGh+jDUX4jdMhFIh1rALAtV5bQ=",
                "dev": true,
                "requires": {
                "user-home": "^1.1.1"
              }
            },
            "validate-npm-package-license": {
              "version": "3.0.4",
                "resolved": "https://registry.npmjs.org/validate-npm-package-license/-/validate-npm-package-license-3.0.4.tgz",
                "integrity": "sha512-DpKm2Ui/xN7/HQKCtpZxoRWBhZ9Z0kqtygG8XCgNQ8ZlDnxuQmWhj566j8fN4Cu3/JmbhsDo7fcAJq4s9h27Ew==",
                "requires": {
                "spdx-correct": "^3.0.0",
                  "spdx-expression-parse": "^3.0.0"
              }
            },
            "value-equal": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/value-equal/-/value-equal-1.0.1.tgz",
                "integrity": "sha512-NOJ6JZCAWr0zlxZt+xqCHNTEKOsrks2HQd4MqhP1qy4z1SkbEP467eNx6TgDKXMvUOb+OENfJCZwM+16n7fRfw=="
            },
            "vary": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
                "integrity": "sha1-IpnwLG3tMNSllhsLn3RSShj2NPw="
            },
            "vendors": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/vendors/-/vendors-1.0.3.tgz",
                "integrity": "sha512-fOi47nsJP5Wqefa43kyWSg80qF+Q3XA6MUkgi7Hp1HQaKDQW4cQrK2D0P7mmbFtsV1N89am55Yru/nyEwRubcw=="
            },
            "verror": {
              "version": "1.10.0",
                "resolved": "https://registry.npmjs.org/verror/-/verror-1.10.0.tgz",
                "integrity": "sha1-OhBcoXBTr1XW4nDB+CiGguGNpAA=",
                "requires": {
                "assert-plus": "^1.0.0",
                  "core-util-is": "1.0.2",
                  "extsprintf": "^1.2.0"
              }
            },
            "vm-browserify": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/vm-browserify/-/vm-browserify-1.1.2.tgz",
                "integrity": "sha512-2ham8XPWTONajOR0ohOKOHXkm3+gaBmGut3SRuu75xLd/RRaY6vqgh8NBYYk7+RW3u5AtzPQZG8F10LHkl0lAQ=="
            },
            "w3c-hr-time": {
              "version": "1.0.1",
                "resolved": "https://registry.npmjs.org/w3c-hr-time/-/w3c-hr-time-1.0.1.tgz",
                "integrity": "sha1-gqwr/2PZUOqeMYmlimViX+3xkEU=",
                "requires": {
                "browser-process-hrtime": "^0.1.2"
              }
            },
            "w3c-xmlserializer": {
              "version": "1.1.2",
                "resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-1.1.2.tgz",
                "integrity": "sha512-p10l/ayESzrBMYWRID6xbuCKh2Fp77+sA0doRuGn4tTIMrrZVeqfpKjXHY+oDh3K4nLdPgNwMTVP6Vp4pvqbNg==",
                "requires": {
                "domexception": "^1.0.1",
                  "webidl-conversions": "^4.0.2",
                  "xml-name-validator": "^3.0.0"
              }
            },
            "walker": {
              "version": "1.0.7",
                "resolved": "https://registry.npmjs.org/walker/-/walker-1.0.7.tgz",
                "integrity": "sha1-L3+bj9ENZ3JisYqITijRlhjgKPs=",
                "requires": {
                "makeerror": "1.0.x"
              }
            },
            "warning": {
              "version": "4.0.3",
                "resolved": "https://registry.npmjs.org/warning/-/warning-4.0.3.tgz",
                "integrity": "sha512-rpJyN222KWIvHJ/F53XSZv0Zl/accqHR8et1kpaMTD/fLCRxtV8iX8czMzY7sVZupTI3zcUTg8eycS2kNF9l6w==",
                "requires": {
                "loose-envify": "^1.0.0"
              }
            },
            "watchpack": {
              "version": "1.6.0",
                "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-1.6.0.tgz",
                "integrity": "sha512-i6dHe3EyLjMmDlU1/bGQpEw25XSjkJULPuAVKCbNRefQVq48yXKUpwg538F7AZTf9kyr57zj++pQFltUa5H7yA==",
                "requires": {
                "chokidar": "^2.0.2",
                  "graceful-fs": "^4.1.2",
                  "neo-async": "^2.5.0"
              }
            },
            "wbuf": {
              "version": "1.7.3",
                "resolved": "https://registry.npmjs.org/wbuf/-/wbuf-1.7.3.tgz",
                "integrity": "sha512-O84QOnr0icsbFGLS0O3bI5FswxzRr8/gHwWkDlQFskhSPryQXvrTMxjxGP4+iWYoauLoBvfDpkrOauZ+0iZpDA==",
                "requires": {
                "minimalistic-assert": "^1.0.0"
              }
            },
            "webidl-conversions": {
              "version": "4.0.2",
                "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-4.0.2.tgz",
                "integrity": "sha512-YQ+BmxuTgd6UXZW3+ICGfyqRyHXVlD5GtQr5+qjiNW7bF0cqrzX500HVXPBOvgXb5YnzDd+h0zqyv61KUD7+Sg=="
            },
            "webpack": {
              "version": "4.41.2",
                "resolved": "https://registry.npmjs.org/webpack/-/webpack-4.41.2.tgz",
                "integrity": "sha512-Zhw69edTGfbz9/8JJoyRQ/pq8FYUoY0diOXqW0T6yhgdhCv6wr0hra5DwwWexNRns2Z2+gsnrNcbe9hbGBgk/A==",
                "requires": {
                "@webassemblyjs/ast": "1.8.5",
                  "@webassemblyjs/helper-module-context": "1.8.5",
                  "@webassemblyjs/wasm-edit": "1.8.5",
                  "@webassemblyjs/wasm-parser": "1.8.5",
                  "acorn": "^6.2.1",
                  "ajv": "^6.10.2",
                  "ajv-keywords": "^3.4.1",
                  "chrome-trace-event": "^1.0.2",
                  "enhanced-resolve": "^4.1.0",
                  "eslint-scope": "^4.0.3",
                  "json-parse-better-errors": "^1.0.2",
                  "loader-runner": "^2.4.0",
                  "loader-utils": "^1.2.3",
                  "memory-fs": "^0.4.1",
                  "micromatch": "^3.1.10",
                  "mkdirp": "^0.5.1",
                  "neo-async": "^2.6.1",
                  "node-libs-browser": "^2.2.1",
                  "schema-utils": "^1.0.0",
                  "tapable": "^1.1.3",
                  "terser-webpack-plugin": "^1.4.1",
                  "watchpack": "^1.6.0",
                  "webpack-sources": "^1.4.1"
              },
              "dependencies": {
                "acorn": {
                  "version": "6.4.0",
                    "resolved": "https://registry.npmjs.org/acorn/-/acorn-6.4.0.tgz",
                    "integrity": "sha512-gac8OEcQ2Li1dxIEWGZzsp2BitJxwkwcOm0zHAJLcPJaVvm58FRnk6RkuLRpU1EujipU2ZFODv2P9DLMfnV8mw=="
                },
                "ajv": {
                  "version": "6.10.2",
                    "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.10.2.tgz",
                    "integrity": "sha512-TXtUUEYHuaTEbLZWIKUr5pmBuhDLy+8KYtPYdcV8qC+pOZL+NKqYwvWSRrVXHn+ZmRRAu8vJTAznH7Oag6RVRw==",
                    "requires": {
                    "fast-deep-equal": "^2.0.1",
                      "fast-json-stable-stringify": "^2.0.0",
                      "json-schema-traverse": "^0.4.1",
                      "uri-js": "^4.2.2"
                  }
                },
                "cacache": {
                  "version": "12.0.3",
                    "resolved": "https://registry.npmjs.org/cacache/-/cacache-12.0.3.tgz",
                    "integrity": "sha512-kqdmfXEGFepesTuROHMs3MpFLWrPkSSpRqOw80RCflZXy/khxaArvFrQ7uJxSUduzAufc6G0g1VUCOZXxWavPw==",
                    "requires": {
                    "bluebird": "^3.5.5",
                      "chownr": "^1.1.1",
                      "figgy-pudding": "^3.5.1",
                      "glob": "^7.1.4",
                      "graceful-fs": "^4.1.15",
                      "infer-owner": "^1.0.3",
                      "lru-cache": "^5.1.1",
                      "mississippi": "^3.0.0",
                      "mkdirp": "^0.5.1",
                      "move-concurrently": "^1.0.1",
                      "promise-inflight": "^1.0.1",
                      "rimraf": "^2.6.3",
                      "ssri": "^6.0.1",
                      "unique-filename": "^1.1.1",
                      "y18n": "^4.0.0"
                  }
                },
                "glob": {
                  "version": "7.1.6",
                    "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
                    "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
                    "requires": {
                    "fs.realpath": "^1.0.0",
                      "inflight": "^1.0.4",
                      "inherits": "2",
                      "minimatch": "^3.0.4",
                      "once": "^1.3.0",
                      "path-is-absolute": "^1.0.0"
                  }
                },
                "lru-cache": {
                  "version": "5.1.1",
                    "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
                    "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
                    "requires": {
                    "yallist": "^3.0.2"
                  }
                },
                "schema-utils": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
                    "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
                    "requires": {
                    "ajv": "^6.1.0",
                      "ajv-errors": "^1.0.0",
                      "ajv-keywords": "^3.1.0"
                  }
                },
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                },
                "ssri": {
                  "version": "6.0.1",
                    "resolved": "https://registry.npmjs.org/ssri/-/ssri-6.0.1.tgz",
                    "integrity": "sha512-3Wge10hNcT1Kur4PDFwEieXSCMCJs/7WvSACcrMYrNp+b8kDL1/0wJch5Ni2WrtwEa2IO8OsVfeKIciKCDx/QA==",
                    "requires": {
                    "figgy-pudding": "^3.5.1"
                  }
                },
                "terser-webpack-plugin": {
                  "version": "1.4.3",
                    "resolved": "https://registry.npmjs.org/terser-webpack-plugin/-/terser-webpack-plugin-1.4.3.tgz",
                    "integrity": "sha512-QMxecFz/gHQwteWwSo5nTc6UaICqN1bMedC5sMtUc7y3Ha3Q8y6ZO0iCR8pq4RJC8Hjf0FEPEHZqcMB/+DFCrA==",
                    "requires": {
                    "cacache": "^12.0.2",
                      "find-cache-dir": "^2.1.0",
                      "is-wsl": "^1.1.0",
                      "schema-utils": "^1.0.0",
                      "serialize-javascript": "^2.1.2",
                      "source-map": "^0.6.1",
                      "terser": "^4.1.2",
                      "webpack-sources": "^1.4.0",
                      "worker-farm": "^1.7.0"
                  }
                },
                "y18n": {
                  "version": "4.0.0",
                    "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.0.tgz",
                    "integrity": "sha512-r9S/ZyXu/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW+17kbt9G0NrgCmhGb5vT2hyhJZLfDGx+7+5Uj/w=="
                },
                "yallist": {
                  "version": "3.1.1",
                    "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
                    "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g=="
                }
              }
            },
            "webpack-dev-middleware": {
              "version": "3.7.2",
                "resolved": "https://registry.npmjs.org/webpack-dev-middleware/-/webpack-dev-middleware-3.7.2.tgz",
                "integrity": "sha512-1xC42LxbYoqLNAhV6YzTYacicgMZQTqRd27Sim9wn5hJrX3I5nxYy1SxSd4+gjUFsz1dQFj+yEe6zEVmSkeJjw==",
                "requires": {
                "memory-fs": "^0.4.1",
                  "mime": "^2.4.4",
                  "mkdirp": "^0.5.1",
                  "range-parser": "^1.2.1",
                  "webpack-log": "^2.0.0"
              }
            },
            "webpack-dev-server": {
              "version": "3.9.0",
                "resolved": "https://registry.npmjs.org/webpack-dev-server/-/webpack-dev-server-3.9.0.tgz",
                "integrity": "sha512-E6uQ4kRrTX9URN9s/lIbqTAztwEPdvzVrcmHE8EQ9YnuT9J8Es5Wrd8n9BKg1a0oZ5EgEke/EQFgUsp18dSTBw==",
                "requires": {
                "ansi-html": "0.0.7",
                  "bonjour": "^3.5.0",
                  "chokidar": "^2.1.8",
                  "compression": "^1.7.4",
                  "connect-history-api-fallback": "^1.6.0",
                  "debug": "^4.1.1",
                  "del": "^4.1.1",
                  "express": "^4.17.1",
                  "html-entities": "^1.2.1",
                  "http-proxy-middleware": "0.19.1",
                  "import-local": "^2.0.0",
                  "internal-ip": "^4.3.0",
                  "ip": "^1.1.5",
                  "is-absolute-url": "^3.0.3",
                  "killable": "^1.0.1",
                  "loglevel": "^1.6.4",
                  "opn": "^5.5.0",
                  "p-retry": "^3.0.1",
                  "portfinder": "^1.0.25",
                  "schema-utils": "^1.0.0",
                  "selfsigned": "^1.10.7",
                  "semver": "^6.3.0",
                  "serve-index": "^1.9.1",
                  "sockjs": "0.3.19",
                  "sockjs-client": "1.4.0",
                  "spdy": "^4.0.1",
                  "strip-ansi": "^3.0.1",
                  "supports-color": "^6.1.0",
                  "url": "^0.11.0",
                  "webpack-dev-middleware": "^3.7.2",
                  "webpack-log": "^2.0.0",
                  "ws": "^6.2.1",
                  "yargs": "12.0.5"
              },
              "dependencies": {
                "camelcase": {
                  "version": "5.3.1",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
                    "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
                },
                "cliui": {
                  "version": "4.1.0",
                    "resolved": "https://registry.npmjs.org/cliui/-/cliui-4.1.0.tgz",
                    "integrity": "sha512-4FG+RSG9DL7uEwRUZXZn3SS34DiDPfzP0VOiEwtUWlE+AR2EIg+hSyvrIgUUfhdgR/UkAeW2QHgeP+hWrXs7jQ==",
                    "requires": {
                    "string-width": "^2.1.1",
                      "strip-ansi": "^4.0.0",
                      "wrap-ansi": "^2.0.0"
                  },
                  "dependencies": {
                    "ansi-regex": {
                      "version": "3.0.0",
                        "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
                        "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
                    },
                    "strip-ansi": {
                      "version": "4.0.0",
                        "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
                        "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
                        "requires": {
                        "ansi-regex": "^3.0.0"
                      }
                    }
                  }
                },
                "debug": {
                  "version": "4.1.1",
                    "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
                    "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
                    "requires": {
                    "ms": "^2.1.1"
                  }
                },
                "find-up": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
                    "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
                    "requires": {
                    "locate-path": "^3.0.0"
                  }
                },
                "invert-kv": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-2.0.0.tgz",
                    "integrity": "sha512-wPVv/y/QQ/Uiirj/vh3oP+1Ww+AWehmi1g5fFWGPF6IpCBCDVrhgHRMvrLfdYcwDh3QJbGXDW4JAuzxElLSqKA=="
                },
                "is-absolute-url": {
                  "version": "3.0.3",
                    "resolved": "https://registry.npmjs.org/is-absolute-url/-/is-absolute-url-3.0.3.tgz",
                    "integrity": "sha512-opmNIX7uFnS96NtPmhWQgQx6/NYFgsUXYMllcfzwWKUMwfo8kku1TvE6hkNcH+Q1ts5cMVrsY7j0bxXQDciu9Q=="
                },
                "lcid": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/lcid/-/lcid-2.0.0.tgz",
                    "integrity": "sha512-avPEb8P8EGnwXKClwsNUgryVjllcRqtMYa49NTsbQagYuT1DcXnl1915oxWjoyGrXR6zH/Y0Zc96xWsPcoDKeA==",
                    "requires": {
                    "invert-kv": "^2.0.0"
                  }
                },
                "os-locale": {
                  "version": "3.1.0",
                    "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-3.1.0.tgz",
                    "integrity": "sha512-Z8l3R4wYWM40/52Z+S265okfFj8Kt2cC2MKY+xNi3kFs+XGI7WXu/I309QQQYbRW4ijiZ+yxs9pqEhJh0DqW3Q==",
                    "requires": {
                    "execa": "^1.0.0",
                      "lcid": "^2.0.0",
                      "mem": "^4.0.0"
                  }
                },
                "schema-utils": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/schema-utils/-/schema-utils-1.0.0.tgz",
                    "integrity": "sha512-i27Mic4KovM/lnGsy8whRCHhc7VicJajAjTrYg11K9zfZXnYIt4k5F+kZkwjnrhKzLic/HLU4j11mjsz2G/75g==",
                    "requires": {
                    "ajv": "^6.1.0",
                      "ajv-errors": "^1.0.0",
                      "ajv-keywords": "^3.1.0"
                  }
                },
                "semver": {
                  "version": "6.3.0",
                    "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
                    "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw=="
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                },
                "supports-color": {
                  "version": "6.1.0",
                    "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-6.1.0.tgz",
                    "integrity": "sha512-qe1jfm1Mg7Nq/NSh6XE24gPXROEVsWHxC1LIx//XNlD9iw7YZQGjZNjYN7xGaEG6iKdA8EtNFW6R0gjnVXp+wQ==",
                    "requires": {
                    "has-flag": "^3.0.0"
                  }
                },
                "which-module": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
                    "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
                },
                "ws": {
                  "version": "6.2.1",
                    "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.1.tgz",
                    "integrity": "sha512-GIyAXC2cB7LjvpgMt9EKS2ldqr0MTrORaleiOno6TweZ6r3TKtoFQWay/2PceJ3RuBasOHzXNn5Lrw1X0bEjqA==",
                    "requires": {
                    "async-limiter": "~1.0.0"
                  }
                },
                "yargs": {
                  "version": "12.0.5",
                    "resolved": "https://registry.npmjs.org/yargs/-/yargs-12.0.5.tgz",
                    "integrity": "sha512-Lhz8TLaYnxq/2ObqHDql8dX8CJi97oHxrjUcYtzKbbykPtVW9WB+poxI+NM2UIzsMgNCZTIf0AQwsjK5yMAqZw==",
                    "requires": {
                    "cliui": "^4.0.0",
                      "decamelize": "^1.2.0",
                      "find-up": "^3.0.0",
                      "get-caller-file": "^1.0.1",
                      "os-locale": "^3.0.0",
                      "require-directory": "^2.1.1",
                      "require-main-filename": "^1.0.1",
                      "set-blocking": "^2.0.0",
                      "string-width": "^2.0.0",
                      "which-module": "^2.0.0",
                      "y18n": "^3.2.1 || ^4.0.0",
                      "yargs-parser": "^11.1.1"
                  }
                },
                "yargs-parser": {
                  "version": "11.1.1",
                    "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-11.1.1.tgz",
                    "integrity": "sha512-C6kB/WJDiaxONLJQnF8ccx9SEeoTTLek8RVbaOIsrAUS8VrBEXfmeSnCZxygc+XC2sNMBIwOOnfcxiynjHsVSQ==",
                    "requires": {
                    "camelcase": "^5.0.0",
                      "decamelize": "^1.2.0"
                  }
                }
              }
            },
            "webpack-log": {
              "version": "2.0.0",
                "resolved": "https://registry.npmjs.org/webpack-log/-/webpack-log-2.0.0.tgz",
                "integrity": "sha512-cX8G2vR/85UYG59FgkoMamwHUIkSSlV3bBMRsbxVXVUk2j6NleCKjQ/WE9eYg9WY4w25O9w8wKP4rzNZFmUcUg==",
                "requires": {
                "ansi-colors": "^3.0.0",
                  "uuid": "^3.3.2"
              }
            },
            "webpack-manifest-plugin": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/webpack-manifest-plugin/-/webpack-manifest-plugin-2.2.0.tgz",
                "integrity": "sha512-9S6YyKKKh/Oz/eryM1RyLVDVmy3NSPV0JXMRhZ18fJsq+AwGxUY34X54VNwkzYcEmEkDwNxuEOboCZEebJXBAQ==",
                "requires": {
                "fs-extra": "^7.0.0",
                  "lodash": ">=3.5 <5",
                  "object.entries": "^1.1.0",
                  "tapable": "^1.0.0"
              },
              "dependencies": {
                "fs-extra": {
                  "version": "7.0.1",
                    "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-7.0.1.tgz",
                    "integrity": "sha512-YJDaCJZEnBmcbw13fvdAM9AwNOJwOzrE4pqMqBq5nFiEqXUqHwlK4B+3pUw6JNvfSPtX05xFHtYy/1ni01eGCw==",
                    "requires": {
                    "graceful-fs": "^4.1.2",
                      "jsonfile": "^4.0.0",
                      "universalify": "^0.1.0"
                  }
                }
              }
            },
            "webpack-sources": {
              "version": "1.4.3",
                "resolved": "https://registry.npmjs.org/webpack-sources/-/webpack-sources-1.4.3.tgz",
                "integrity": "sha512-lgTS3Xhv1lCOKo7SA5TjKXMjpSM4sBjNV5+q2bqesbSPs5FjGmU6jjtBSkX9b4qW87vDIsCIlUPOEhbZrMdjeQ==",
                "requires": {
                "source-list-map": "^2.0.0",
                  "source-map": "~0.6.1"
              },
              "dependencies": {
                "source-map": {
                  "version": "0.6.1",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
                    "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="
                }
              }
            },
            "websocket-driver": {
              "version": "0.7.3",
                "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.3.tgz",
                "integrity": "sha512-bpxWlvbbB459Mlipc5GBzzZwhoZgGEZLuqPaR0INBGnPAY1vdBX6hPnoFXiw+3yWxDuHyQjO2oXTMyS8A5haFg==",
                "requires": {
                "http-parser-js": ">=0.4.0 <0.4.11",
                  "safe-buffer": ">=5.1.0",
                  "websocket-extensions": ">=0.1.1"
              }
            },
            "websocket-extensions": {
              "version": "0.1.3",
                "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.3.tgz",
                "integrity": "sha512-nqHUnMXmBzT0w570r2JpJxfiSD1IzoI+HGVdd3aZ0yNi3ngvQ4jv1dtHt5VGxfI2yj5yqImPhOK4vmIh2xMbGg=="
            },
            "whatwg-encoding": {
              "version": "1.0.5",
                "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-1.0.5.tgz",
                "integrity": "sha512-b5lim54JOPN9HtzvK9HFXvBma/rnfFeqsic0hSpjtDbVxR3dJKLc+KB4V6GgiGOvl7CY/KNh8rxSo9DKQrnUEw==",
                "requires": {
                "iconv-lite": "0.4.24"
              }
            },
            "whatwg-fetch": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/whatwg-fetch/-/whatwg-fetch-3.0.0.tgz",
                "integrity": "sha512-9GSJUgz1D4MfyKU7KRqwOjXCXTqWdFNvEr7eUBYchQiVc744mqK/MzXPNR2WsPkmkOa4ywfg8C2n8h+13Bey1Q=="
            },
            "whatwg-mimetype": {
              "version": "2.3.0",
                "resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-2.3.0.tgz",
                "integrity": "sha512-M4yMwr6mAnQz76TbJm914+gPpB/nCwvZbJU28cUD6dR004SAxDLOOSUaB1JDRqLtaOV/vi0IC5lEAGFgrjGv/g=="
            },
            "whatwg-url": {
              "version": "6.5.0",
                "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-6.5.0.tgz",
                "integrity": "sha512-rhRZRqx/TLJQWUpQ6bmrt2UV4f0HCQ463yQuONJqC6fO2VoEb1pTYddbe59SkYq87aoM5A3bdhMZiUiVws+fzQ==",
                "requires": {
                "lodash.sortby": "^4.7.0",
                  "tr46": "^1.0.1",
                  "webidl-conversions": "^4.0.2"
              }
            },
            "which": {
              "version": "1.3.1",
                "resolved": "https://registry.npmjs.org/which/-/which-1.3.1.tgz",
                "integrity": "sha512-HxJdYWq1MTIQbJ3nw0cqssHoTNU267KlrDuGZ1WYlxDStUtKUhOaJmh112/TZmHxxUfuJqPXSOm7tDyas0OSIQ==",
                "requires": {
                "isexe": "^2.0.0"
              }
            },
            "which-module": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/which-module/-/which-module-1.0.0.tgz",
                "integrity": "sha1-u6Y8qGGUiZT/MHc2CJ47lgJsKk8="
            },
            "wide-align": {
              "version": "1.1.3",
                "resolved": "https://registry.npmjs.org/wide-align/-/wide-align-1.1.3.tgz",
                "integrity": "sha512-QGkOQc8XL6Bt5PwnsExKBPuMKBxnGxWWW3fU55Xt4feHozMUhdUMaBCk290qpm/wG5u/RSKzwdAC4i51YigihA==",
                "requires": {
                "string-width": "^1.0.2 || 2"
              }
            },
            "word-wrap": {
              "version": "1.2.3",
                "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.3.tgz",
                "integrity": "sha512-Hz/mrNwitNRh/HUAtM/VT/5VH+ygD6DV7mYKZAtHOrbs8U7lvPS6xf7EJKMF0uW1KJCl0H701g3ZGus+muE5vQ=="
            },
            "wordwrap": {
              "version": "1.0.0",
                "resolved": "https://registry.npmjs.org/wordwrap/-/wordwrap-1.0.0.tgz",
                "integrity": "sha1-J1hIEIkUVqQXHI0CJkQa3pDLyus="
            },
            "workbox-background-sync": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-background-sync/-/workbox-background-sync-4.3.1.tgz",
                "integrity": "sha512-1uFkvU8JXi7L7fCHVBEEnc3asPpiAL33kO495UMcD5+arew9IbKW2rV5lpzhoWcm/qhGB89YfO4PmB/0hQwPRg==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-broadcast-update": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-broadcast-update/-/workbox-broadcast-update-4.3.1.tgz",
                "integrity": "sha512-MTSfgzIljpKLTBPROo4IpKjESD86pPFlZwlvVG32Kb70hW+aob4Jxpblud8EhNb1/L5m43DUM4q7C+W6eQMMbA==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-build": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-build/-/workbox-build-4.3.1.tgz",
                "integrity": "sha512-UHdwrN3FrDvicM3AqJS/J07X0KXj67R8Cg0waq1MKEOqzo89ap6zh6LmaLnRAjpB+bDIz+7OlPye9iii9KBnxw==",
                "requires": {
                "@babel/runtime": "^7.3.4",
                  "@hapi/joi": "^15.0.0",
                  "common-tags": "^1.8.0",
                  "fs-extra": "^4.0.2",
                  "glob": "^7.1.3",
                  "lodash.template": "^4.4.0",
                  "pretty-bytes": "^5.1.0",
                  "stringify-object": "^3.3.0",
                  "strip-comments": "^1.0.2",
                  "workbox-background-sync": "^4.3.1",
                  "workbox-broadcast-update": "^4.3.1",
                  "workbox-cacheable-response": "^4.3.1",
                  "workbox-core": "^4.3.1",
                  "workbox-expiration": "^4.3.1",
                  "workbox-google-analytics": "^4.3.1",
                  "workbox-navigation-preload": "^4.3.1",
                  "workbox-precaching": "^4.3.1",
                  "workbox-range-requests": "^4.3.1",
                  "workbox-routing": "^4.3.1",
                  "workbox-strategies": "^4.3.1",
                  "workbox-streams": "^4.3.1",
                  "workbox-sw": "^4.3.1",
                  "workbox-window": "^4.3.1"
              },
              "dependencies": {
                "fs-extra": {
                  "version": "4.0.3",
                    "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-4.0.3.tgz",
                    "integrity": "sha512-q6rbdDd1o2mAnQreO7YADIxf/Whx4AHBiRf6d+/cVT8h44ss+lHgxf1FemcqDnQt9X3ct4McHr+JMGlYSsK7Cg==",
                    "requires": {
                    "graceful-fs": "^4.1.2",
                      "jsonfile": "^4.0.0",
                      "universalify": "^0.1.0"
                  }
                }
              }
            },
            "workbox-cacheable-response": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-cacheable-response/-/workbox-cacheable-response-4.3.1.tgz",
                "integrity": "sha512-Rp5qlzm6z8IOvnQNkCdO9qrDgDpoPNguovs0H8C+wswLuPgSzSp9p2afb5maUt9R1uTIwOXrVQMmPfPypv+npw==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-core": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-core/-/workbox-core-4.3.1.tgz",
                "integrity": "sha512-I3C9jlLmMKPxAC1t0ExCq+QoAMd0vAAHULEgRZ7kieCdUd919n53WC0AfvokHNwqRhGn+tIIj7vcb5duCjs2Kg=="
            },
            "workbox-expiration": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-expiration/-/workbox-expiration-4.3.1.tgz",
                "integrity": "sha512-vsJLhgQsQouv9m0rpbXubT5jw0jMQdjpkum0uT+d9tTwhXcEZks7qLfQ9dGSaufTD2eimxbUOJfWLbNQpIDMPw==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-google-analytics": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-google-analytics/-/workbox-google-analytics-4.3.1.tgz",
                "integrity": "sha512-xzCjAoKuOb55CBSwQrbyWBKqp35yg1vw9ohIlU2wTy06ZrYfJ8rKochb1MSGlnoBfXGWss3UPzxR5QL5guIFdg==",
                "requires": {
                "workbox-background-sync": "^4.3.1",
                  "workbox-core": "^4.3.1",
                  "workbox-routing": "^4.3.1",
                  "workbox-strategies": "^4.3.1"
              }
            },
            "workbox-navigation-preload": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-navigation-preload/-/workbox-navigation-preload-4.3.1.tgz",
                "integrity": "sha512-K076n3oFHYp16/C+F8CwrRqD25GitA6Rkd6+qAmLmMv1QHPI2jfDwYqrytOfKfYq42bYtW8Pr21ejZX7GvALOw==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-precaching": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-precaching/-/workbox-precaching-4.3.1.tgz",
                "integrity": "sha512-piSg/2csPoIi/vPpp48t1q5JLYjMkmg5gsXBQkh/QYapCdVwwmKlU9mHdmy52KsDGIjVaqEUMFvEzn2LRaigqQ==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-range-requests": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-range-requests/-/workbox-range-requests-4.3.1.tgz",
                "integrity": "sha512-S+HhL9+iTFypJZ/yQSl/x2Bf5pWnbXdd3j57xnb0V60FW1LVn9LRZkPtneODklzYuFZv7qK6riZ5BNyc0R0jZA==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-routing": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-routing/-/workbox-routing-4.3.1.tgz",
                "integrity": "sha512-FkbtrODA4Imsi0p7TW9u9MXuQ5P4pVs1sWHK4dJMMChVROsbEltuE79fBoIk/BCztvOJ7yUpErMKa4z3uQLX+g==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-strategies": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-strategies/-/workbox-strategies-4.3.1.tgz",
                "integrity": "sha512-F/+E57BmVG8dX6dCCopBlkDvvhg/zj6VDs0PigYwSN23L8hseSRwljrceU2WzTvk/+BSYICsWmRq5qHS2UYzhw==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-streams": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-streams/-/workbox-streams-4.3.1.tgz",
                "integrity": "sha512-4Kisis1f/y0ihf4l3u/+ndMkJkIT4/6UOacU3A4BwZSAC9pQ9vSvJpIi/WFGQRH/uPXvuVjF5c2RfIPQFSS2uA==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "workbox-sw": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-sw/-/workbox-sw-4.3.1.tgz",
                "integrity": "sha512-0jXdusCL2uC5gM3yYFT6QMBzKfBr2XTk0g5TPAV4y8IZDyVNDyj1a8uSXy3/XrvkVTmQvLN4O5k3JawGReXr9w=="
            },
            "workbox-webpack-plugin": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-webpack-plugin/-/workbox-webpack-plugin-4.3.1.tgz",
                "integrity": "sha512-gJ9jd8Mb8wHLbRz9ZvGN57IAmknOipD3W4XNE/Lk/4lqs5Htw4WOQgakQy/o/4CoXQlMCYldaqUg+EJ35l9MEQ==",
                "requires": {
                "@babel/runtime": "^7.0.0",
                  "json-stable-stringify": "^1.0.1",
                  "workbox-build": "^4.3.1"
              }
            },
            "workbox-window": {
              "version": "4.3.1",
                "resolved": "https://registry.npmjs.org/workbox-window/-/workbox-window-4.3.1.tgz",
                "integrity": "sha512-C5gWKh6I58w3GeSc0wp2Ne+rqVw8qwcmZnQGpjiek8A2wpbxSJb1FdCoQVO+jDJs35bFgo/WETgl1fqgsxN0Hg==",
                "requires": {
                "workbox-core": "^4.3.1"
              }
            },
            "worker-farm": {
              "version": "1.7.0",
                "resolved": "https://registry.npmjs.org/worker-farm/-/worker-farm-1.7.0.tgz",
                "integrity": "sha512-rvw3QTZc8lAxyVrqcSGVm5yP/IJ2UcB3U0graE3LCFoZ0Yn2x4EoVSqJKdB/T5M+FLcRPjz4TDacRf3OCfNUzw==",
                "requires": {
                "errno": "~0.1.7"
              }
            },
            "worker-rpc": {
              "version": "0.1.1",
                "resolved": "https://registry.npmjs.org/worker-rpc/-/worker-rpc-0.1.1.tgz",
                "integrity": "sha512-P1WjMrUB3qgJNI9jfmpZ/htmBEjFh//6l/5y8SD9hg1Ef5zTTVVoRjTrTEzPrNBQvmhMxkoTsjOXN10GWU7aCg==",
                "requires": {
                "microevent.ts": "~0.1.1"
              }
            },
            "wrap-ansi": {
              "version": "2.1.0",
                "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz",
                "integrity": "sha1-2Pw9KE3QV5T+hJc8rs3Rz4JP3YU=",
                "requires": {
                "string-width": "^1.0.1",
                  "strip-ansi": "^3.0.1"
              },
              "dependencies": {
                "is-fullwidth-code-point": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
                    "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
                    "requires": {
                    "number-is-nan": "^1.0.0"
                  }
                },
                "string-width": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
                    "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
                    "requires": {
                    "code-point-at": "^1.0.0",
                      "is-fullwidth-code-point": "^1.0.0",
                      "strip-ansi": "^3.0.0"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                }
              }
            },
            "wrappy": {
              "version": "1.0.2",
                "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
                "integrity": "sha1-tSQ9jz7BqjXxNkYFvA0QNuMKtp8="
            },
            "write": {
              "version": "1.0.3",
                "resolved": "https://registry.npmjs.org/write/-/write-1.0.3.tgz",
                "integrity": "sha512-/lg70HAjtkUgWPVZhZcm+T4hkL8Zbtp1nFNOn3lRrxnlv50SRBv7cR7RqR+GMsd3hUXy9hWBo4CHTbFTcOYwig==",
                "requires": {
                "mkdirp": "^0.5.1"
              }
            },
            "write-file-atomic": {
              "version": "2.4.1",
                "resolved": "https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-2.4.1.tgz",
                "integrity": "sha512-TGHFeZEZMnv+gBFRfjAcxL5bPHrsGKtnb4qsFAws7/vlh+QfwAaySIw4AXP9ZskTTh5GWu3FLuJhsWVdiJPGvg==",
                "requires": {
                "graceful-fs": "^4.1.11",
                  "imurmurhash": "^0.1.4",
                  "signal-exit": "^3.0.2"
              }
            },
            "ws": {
              "version": "5.2.2",
                "resolved": "https://registry.npmjs.org/ws/-/ws-5.2.2.tgz",
                "integrity": "sha512-jaHFD6PFv6UgoIVda6qZllptQsMlDEJkTQcybzzXDYM1XO9Y8em691FGMPmM46WGyLU4z9KMgQN+qrux/nhlHA==",
                "requires": {
                "async-limiter": "~1.0.0"
              }
            },
            "xml-name-validator": {
              "version": "3.0.0",
                "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-3.0.0.tgz",
                "integrity": "sha512-A5CUptxDsvxKJEU3yO6DuWBSJz/qizqzJKOMIfUJHETbBw/sFaDxgd6fxm1ewUaM0jZ444Fc5vC5ROYurg/4Pw=="
            },
            "xmlchars": {
              "version": "2.2.0",
                "resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.2.0.tgz",
                "integrity": "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw=="
            },
            "xtend": {
              "version": "4.0.1",
                "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.1.tgz",
                "integrity": "sha1-pcbVMr5lbiPbgg77lDofBJmNY68="
            },
            "y18n": {
              "version": "3.2.1",
                "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
                "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE="
            },
            "yallist": {
              "version": "2.1.2",
                "resolved": "https://registry.npmjs.org/yallist/-/yallist-2.1.2.tgz",
                "integrity": "sha1-HBH5IY8HYImkfdUS+TxmmaaoHVI="
            },
            "yaml": {
              "version": "1.7.2",
                "resolved": "https://registry.npmjs.org/yaml/-/yaml-1.7.2.tgz",
                "integrity": "sha512-qXROVp90sb83XtAoqE8bP9RwAkTTZbugRUTm5YeFCBfNRPEp2YzTeqWiz7m5OORHzEvrA/qcGS8hp/E+MMROYw==",
                "requires": {
                "@babel/runtime": "^7.6.3"
              }
            },
            "yargs": {
              "version": "7.1.0",
                "resolved": "https://registry.npmjs.org/yargs/-/yargs-7.1.0.tgz",
                "integrity": "sha1-a6MY6xaWFyf10oT46gA+jWFU0Mg=",
                "requires": {
                "camelcase": "^3.0.0",
                  "cliui": "^3.2.0",
                  "decamelize": "^1.1.1",
                  "get-caller-file": "^1.0.1",
                  "os-locale": "^1.4.0",
                  "read-pkg-up": "^1.0.1",
                  "require-directory": "^2.1.1",
                  "require-main-filename": "^1.0.1",
                  "set-blocking": "^2.0.0",
                  "string-width": "^1.0.2",
                  "which-module": "^1.0.0",
                  "y18n": "^3.2.1",
                  "yargs-parser": "^5.0.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-3.0.0.tgz",
                    "integrity": "sha1-MvxLn82vhF/N9+c7uXysImHwqwo="
                },
                "is-fullwidth-code-point": {
                  "version": "1.0.0",
                    "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-1.0.0.tgz",
                    "integrity": "sha1-754xOG8DGn8NZDr4L95QxFfvAMs=",
                    "requires": {
                    "number-is-nan": "^1.0.0"
                  }
                },
                "load-json-file": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/load-json-file/-/load-json-file-1.1.0.tgz",
                    "integrity": "sha1-lWkFcI1YtLq0wiYbBPWfMcmTdMA=",
                    "requires": {
                    "graceful-fs": "^4.1.2",
                      "parse-json": "^2.2.0",
                      "pify": "^2.0.0",
                      "pinkie-promise": "^2.0.0",
                      "strip-bom": "^2.0.0"
                  }
                },
                "parse-json": {
                  "version": "2.2.0",
                    "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-2.2.0.tgz",
                    "integrity": "sha1-9ID0BDTvgHQfhGkJn43qGPVaTck=",
                    "requires": {
                    "error-ex": "^1.2.0"
                  }
                },
                "read-pkg": {
                  "version": "1.1.0",
                    "resolved": "https://registry.npmjs.org/read-pkg/-/read-pkg-1.1.0.tgz",
                    "integrity": "sha1-9f+qXs0pyzHAR0vKfXVra7KePyg=",
                    "requires": {
                    "load-json-file": "^1.0.0",
                      "normalize-package-data": "^2.3.2",
                      "path-type": "^1.0.0"
                  }
                },
                "read-pkg-up": {
                  "version": "1.0.1",
                    "resolved": "https://registry.npmjs.org/read-pkg-up/-/read-pkg-up-1.0.1.tgz",
                    "integrity": "sha1-nWPBMnbAZZGNV/ACpX9AobZD+wI=",
                    "requires": {
                    "find-up": "^1.0.0",
                      "read-pkg": "^1.0.0"
                  }
                },
                "string-width": {
                  "version": "1.0.2",
                    "resolved": "https://registry.npmjs.org/string-width/-/string-width-1.0.2.tgz",
                    "integrity": "sha1-EYvfW4zcUaKn5w0hHgfisLmxB9M=",
                    "requires": {
                    "code-point-at": "^1.0.0",
                      "is-fullwidth-code-point": "^1.0.0",
                      "strip-ansi": "^3.0.0"
                  }
                },
                "strip-ansi": {
                  "version": "3.0.1",
                    "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-3.0.1.tgz",
                    "integrity": "sha1-ajhfuIU9lS1f8F0Oiq+UJ43GPc8=",
                    "requires": {
                    "ansi-regex": "^2.0.0"
                  }
                },
                "strip-bom": {
                  "version": "2.0.0",
                    "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-2.0.0.tgz",
                    "integrity": "sha1-YhmoVhZSBJHzV4i9vxRHqZx+aw4=",
                    "requires": {
                    "is-utf8": "^0.2.0"
                  }
                }
              }
            },
            "yargs-parser": {
              "version": "5.0.0",
                "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-5.0.0.tgz",
                "integrity": "sha1-J17PDX/+Bcd+ZOfIbkzZS/DhIoo=",
                "requires": {
                "camelcase": "^3.0.0"
              },
              "dependencies": {
                "camelcase": {
                  "version": "3.0.0",
                    "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-3.0.0.tgz",
                    "integrity": "sha1-MvxLn82vhF/N9+c7uXysImHwqwo="
                }
              }
            }
          }
          }
          message.error(error.message)
        })
    }
  }

  const updateField = (field, value) => {
    setCompanyState({
      ...companyState,
      [field]: value
    })
  }

  const sendInvite = e => {
    e.preventDefault()
    validateFields()
      .then(() => {
        api.companies.attachUnregisteredUserToCompany({ email: companyState.newUserEmail })
          .then(({ data }) => {
            if (data.success) {
              message.success('Приглашение отправлено')
              setCompanyState({ ...defaultCompanyState })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      })
  }

  const columns = [
    {
      title: 'Наименование',
      key: 'name',
      render: record => <Link to={{ pathname: `/companies/${+record.company_id}`, state: { from: history.location.pathname } }}>{record.company_data.name}</Link>
    },
    {
      title: 'УНП',
      key: 'number',
      dataIndex: 'company_data.company_number'
    },
    {
      title: 'Данные компании',
      key: 'description',
      dataIndex: 'company_data.description'
    },
    {
      title: 'Статус',
      render: record => (
        <Fragment>
          {data.active_company_id &&
          <Popconfirm
            placement='bottomLeft'
            title='Сделать компанию активной?'
            onConfirm={() => changeActiveCompany(record)}
            okText='Сделать активной'
            cancelText='Закрыть'
          >
            <Tag style={{ cursor: 'pointer' }} color={(record.company_data.id === data.active_company_id) ? '#87d068' : '#FF7D1D'}>
              {(record.company_data.id === data.active_company_id) ? 'Активная' : 'Не активная'}
            </Tag>
          </Popconfirm>
          }
        </Fragment>
      )
    }]

  return (
    <Fragment>
      <div className='content content_small-margin'>
        <Table
          pagination
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={isFetching}
          locale={{ emptyText: 'Нет созданных компаний' }}
        />
      </div>

      {companyState.showInput &&
        <div className='invite-block'>
          <Row>
            <Col span={12}>
              <Form onSubmit={sendInvite} style={{ marginTop: '3rem' }}>
                <Form.Item style={{ marginBottom: 0 }} label='Добавление нового пользователя в текущую компанию'>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'Не правильный адрес электронной почты!'
                      },
                      {
                        required: true,
                        message: 'Введите адрес электроной почты'
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='Электронный адрес пользователя'
                      onChange={e => updateField('newUserEmail', e.target.value)}
                      type='email'
                    />
                  )}
                </Form.Item>

                <Button type='primary' style={{ marginTop: '1rem' }} htmlType='submit'>
                  <Icon type='plus' />
                  Отправить приглашение
                </Button>

                <Button
                  type='primary'
                  ghost
                  style={{ marginLeft: '1rem' }}
                  onClick={() => setCompanyState({ ...companyState, newUserEmail: '', showInput: false })}
                >
                  Отмена
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      }

      <Button
        type='primary'
        onClick={onClick}
      >
        Подключить ЭЦП
      </Button>

      <Button
        type='primary'
        style={{ marginLeft: '1rem' }}
        onClick={() => setCompanyState({ ...companyState, showInput: true })}
      >
        <Icon type='usergroup-add' />
        Добавить пользователя в компанию
      </Button>

      <div style={{ marginTop: '1rem' }}>
        {!isIE &&
        <Text type='secondary'>Создание компании возможно только в браузере Internet Explorer</Text>
        }
      </div>
      <Modal
        title='Подключение ЭЦП'
        visible={companyState.showModal}
        width={600}
        closable={false}
        footer={null}
      >
        <CompanyCreate onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })} />
      </Modal>
    </Fragment>
  )
}

export default CompaniesPage
