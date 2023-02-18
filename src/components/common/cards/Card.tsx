import { XIcon } from '@heroicons/react/solid';
import {
   Card as CardContainer,
   CardBody,
   CardFooter,
   CardHeader,
   IconButton,
   Typography,
} from '@material-tailwind/react';
import Image from 'next/image';

export interface CardProps {
   id: string;
   title: string;
   description: string;
   leftFoot: string;
   onDelete: (id: string) => void;
   img?: string;
}

const Card = ({ id, title, description, leftFoot, onDelete, img }: CardProps) => {
   return (
      <CardContainer className="w-32 md:w-40">
         <CardHeader color="purple" className="relative h-16 shadow-md md:h-20">
            <Image src="/images/bowling.jpeg" fill alt="bowling" className="rounded-md shadow-lg" />
         </CardHeader>
         <CardBody className="flex h-20 flex-col justify-between p-2 text-center md:h-[90px]">
            <h2>{title}</h2>
            <p className="text-sm md:text-base">{description}</p>
         </CardBody>
         <CardFooter divider className="flex items-center justify-between px-3 py-2">
            <Typography variant="small" className="font-bold">
               {leftFoot}
            </Typography>
            <IconButton className="h-5 w-5 rounded-full" color="red" onClick={() => onDelete(id)}>
               <XIcon className="h-3 w-3" />
            </IconButton>
         </CardFooter>
      </CardContainer>
   );
};

export default Card;
