import { AvatarStyleTypes, ButtonStyleTypes, MenuStylesType } from '@material-tailwind/react';

const theme: { button: ButtonStyleTypes; avatar: AvatarStyleTypes; menu: MenuStylesType } = {
   button: {
      defaultProps: {
         className: 'rounded-lg bg-main-2 px-4 py-2 text-gray-200',
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
