export const selectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#da200d' : '',
    boxShadow: state.isFocused ? '0 0 0 0.25rem #e7b7b4' : null,
    borderRadius: 0,
  }),

  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#da200d' : 'inherit',
    ':hover': {
      backgroundColor: '#e7b7b4',
    },
  }),
}
