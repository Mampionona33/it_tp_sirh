import * as React from 'react'

function InfoPersoEmploye(props) {
  return (
    <>
      <div className="items-stretch content-start flex-wrap bg-red-50 self-stretch flex w-full flex-col mt-2 pl-14 pr-10 pt-2 pb-2 max-md:max-w-full max-md:px-5">
        <div className="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              Nom *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="text"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              Prénom *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="text"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              Date de naissance *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="date"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              Lieu de naissance *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="text"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              N° CIN *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="text"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
          <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
            <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
              Adresse *
            </div>
            <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
              <input
                type="text"
                className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="max-md:max-w-full max-md:pr-5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
              <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
                Téléphone
              </div>
              <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
                <input
                  type="tel"
                  className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
                />
              </div>
            </div>
            <div className="items-stretch  bg-opacity-0 flex grow basis-[0%] flex-col pl-0.5 pr-6 py-1 max-md:max-w-full max-md:pr-5">
              <div className="justify-end text-black text-sm font-medium whitespace-nowrap max-md:max-w-full">
                Email
              </div>
              <div className="justify-center items-stretch  flex flex-col max-md:max-w-full">
                <input
                  type="email"
                  className="border border-[color:var(--r6,#EE4748)] shadow-sm  bg-opacity-30 h-[30px] p-2 w-full max-md:max-w-full"
                />
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[32%] max-md:w-full max-md:ml-0">
              <div className="bg-opacity-0 flex grow flex-col w-full pl-8 pr-20 pt-0.5 pb-6 items-start max-md:max-w-full max-md:mt-8 max-md:px-5">
                <label className="justify-end text-black text-sm font-medium whitespace-nowrap">
                  Genre
                </label>
                <div className="items-center flex w-[184px] max-w-full gap-3.5 mt-2 p-0.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="masculin"
                      name="genre"
                      value="homme"
                      className="h-4 w-4"
                    />
                    <label htmlFor="homme" className="text-black text-sm font-medium">
                      Masculin
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="feminin"
                      name="genre"
                      value="femme"
                      className="h-4 w-4"
                    />
                    <label htmlFor="femme" className="text-black text-sm font-medium">
                      Féminin
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoPersoEmploye
