import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { IBalls } from '@models/balls';
import useTranslation from 'next-translate/useTranslation';
import { Fragment, useEffect, useState } from 'react';

export interface ComboBoxProps {
   data: IBalls[];
   query: string;
   setQuery: (query: string) => void;
   useValue: (value: any) => void;
   resetQuery?: number;
   placeholder?: string;
}

const ComboBox = ({
   data,
   query,
   setQuery,
   useValue,
   resetQuery,
   placeholder = '',
}: ComboBoxProps) => {
   const { t } = useTranslation('common');
   const [selected, setSelected] = useState<any>({});

   useEffect(() => {
      useValue(selected);
   }, [selected]);

   useEffect(() => {
      console.log(resetQuery);
      if (resetQuery) setSelected({});
   }, [resetQuery]);

   return (
      <div className="w-72">
         <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
               <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                     className="focus:ring-none h-10 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                     displayValue={(ball: any) => ball.name}
                     onChange={(event) => setQuery(event.target.value)}
                     placeholder={placeholder}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                     <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
               >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                     {data === null || (data.length === 0 && query !== '') ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                           Nothing found.
                        </div>
                     ) : (
                        data.map((ball) => (
                           <Combobox.Option
                              key={ball.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-main-3 text-white' : 'text-gray-900'
                                 }`
                              }
                              value={ball}
                           >
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                       }`}
                                    >
                                       {ball.name}
                                    </span>
                                    {selected ? (
                                       <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                             active ? 'text-white' : 'text-teal-600'
                                          }`}
                                       >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   );
};
export default ComboBox;
