import {
   AvatarStyleTypes,
   ButtonStyleTypes,
   InputStylesType,
   MenuStylesType,
   RadioStylesType,
} from '@material-tailwind/react';

const theme: {
   input: InputStylesType;
   button: ButtonStyleTypes;
   radio: RadioStylesType;
   avatar: AvatarStyleTypes;
   menu: MenuStylesType;
} = {
   input: {
      defaultProps: {
         variant: 'static',
         className: 'py-1 px-2 text-lg w-50 text-main-2 number-main-2',
         color: 'red',
         labelProps: {
            className: 'font-bold',
         },
      },
      styles: {
         base: {
            container: {
               className: 'h-auto',
            },
            icon: {
               className: 'w-auto h-auto pr-2 justify-baseline',
            },
            label: {
               className: 'text-main-2 text-base',
            },
         },
      },
   },
   button: {
      defaultProps: {
         variant: 'filled',
         className: 'rounded-lg bg-main-2 px-4 py-2 text-gray-200',
      },
   },
   radio: {
      defaultProps: {
         className: 'text-main-2',
      },
      styles: {
         base: {
            container: {
               className: 'h-6',
            },
            label: {
               className: 'text-main-2',
            },
         },
         colors: {},
      },
   },
   avatar: {
      defaultProps: {
         className: 'h-10 rounded-full cursor-pointer',
      },
   },
   menu: {
      defaultProps: {
         placement: 'bottom-end',
      },
      styles: {
         base: {
            item: {
               initial: {
                  className: 'px-2 py-0',
               },
               disabled: {
                  opacity: 'opacity-50',
                  cursor: 'cursor-not-allowed',
               },
            },
         },
      },
   },
};

export default theme;
