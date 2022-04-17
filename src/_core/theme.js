const baseTheme = {
  button: {
    primary: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    secondary: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    danger: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    default: {
      enabled: "py-1 text-xs font-roboto rounded text-black border hover:shadow",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    }
  },
  textBox: {
    enabled: "",
    disabled: ""
  }
};

const theme = {
  button: {
    primary: {
      enabled: baseTheme.button.primary.enabled + " border-sky-800 bg-sky-800 hover:bg-sky-800 hover:border-white ",
      disabled: baseTheme.button.primary.disabled + " border-gray-200 bg-gray-200 pointer-events-none"
    },
    secondary: {
      enabled: baseTheme.button.primary.enabled + " border-gray-400 hover:border-gray-600 bg-gradient-to-b from-gray-400 hover:from-gray-600 to-gray-600 hover:bg-gray-700a hover:border-whitea ",
      disabled: baseTheme.button.primary.disabled + " border-gray-200 bg-gray-200 pointer-events-none"
    },
    danger: {
      enabled: baseTheme.button.danger.enabled + " border-orange-700 bg-orange-700 hover:bg-orange-700 hover:border-white ",
      disabled: baseTheme.button.danger.disabled + " border-gray-200 bg-gray-200 pointer-events-none"
    },
    default: {
      enabled: baseTheme.button.default.enabled + " border-gray-200 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:border-gray-300 ",
      disabled: baseTheme.button.default.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    }
  },
  detailTable: {
    commandBarButton: {
      enabled: "",
      disabled: ""
    },
    sideBarButton: {
      enabled: "",
      disabled: ""
    },
  },
  textBox: {
    enabled: "",
    disabled: ""
  }
};

export default theme;