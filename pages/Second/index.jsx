import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomText from '../../components/ui/CustomText';
import {
  Button,
  CheckBox,
  ColumnHour,
  ColumnHourWrapper,
  ColumnMinutes,
  ColumnMinutesWrapper,
  Form,
  IconCalendar,
  Input,
  Root,
  Text,
  TimeItem,
} from '../../components/SecondStage/Elements';
import {
  itemsHours,
  itemsMinutes,
} from '../../components/SecondStage/content';
import { useRouter } from 'next/router';
import { BackGround } from '../../components/ui/BackGround';
import Stepper from '../../components/ui/Stepper';
import Head from 'next/head';
import { ErrorText } from '../../components/ui/ErrorText';


const Index = () => {


  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isValid,
    },
    setError,
    // trigger,
    // resetField,
  } = useForm({
    mode: 'onSubmit',
  });

  const [selectedHourMenu, setSelectedHourMenu] = useState(false);
  const [selectedMinuteMenu, setSelectedMinuteMenu] = useState(false);

  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [personsValue, setPersonsValue] = useState(0);

  const [date, setDate] = useState('');

  const [timeTotal, setTimeTotal] = useState();

  const [isChecked, setIsChecked] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const router = useRouter();

  const handlePlus = () => {
    setPersonsValue((prev) => {
      const newValue = prev + 1;
      localStorage.setItem('persons', newValue);
      return newValue;
    });
  };
  const handleMinus = () => {
    setPersonsValue((prev) => {
      const newValue = prev > 0 ? prev - 1 : 0;
      localStorage.setItem('persons', newValue);
      return newValue;
    });
  };

  const dataSubmit = (data) => {
    // console.log(data);
    // if (data.personsValue === 0) {
    //   setError('personsValue', {
    //     type: 'manual',
    //     message: 'Это обязательное поле',
    //   })
    //   return;
    // }
    const [year, month, day] = date.split('-');
    const reversedDate = `${day}-${month}-${year}`;
    const time = selectedHour + ':' + selectedMinute;

    if (time && personsValue > 0 && date) {
      localStorage.setItem('time', time);
      localStorage.setItem('persons', personsValue);
      localStorage.setItem('date', reversedDate);
      if (isChecked) {
        localStorage.setItem('hookah', 'буду');
      } else {
        localStorage.setItem('hookah', 'не буду');
      }

      router.push('/third-stage');
    }
  };

  // useEffect(() => {
  //
  //   const timeSaved = localStorage.getItem('time');
  //   const personsSaved = localStorage.getItem('persons');
  //   const dateSaved = localStorage.getItem('date');
  //
  //   const splitedTime = timeSaved ? timeSaved.split(':') : ['', ''];
  //   const hour = splitedTime[0];
  //   const minute = splitedTime[1];
  //
  //   setDate(dateSaved || '');
  //   setSelectedHour(hour || '');
  //   setSelectedMinute(minute || '');
  //   setPersonsValue(parseInt(personsSaved, 10) || 0);
  //
  //   setValue('dateValue', dateSaved || '', { shouldValidate: false });
  //   setValue('hourValue', hour || '', { shouldValidate: false });
  //   setValue('minuteValue', minute || '', { shouldValidate: false });
  //   setValue('persons', parseInt(personsSaved, 10) || 0, { shouldValidate: false });
  //
  //
  //   setValue('dateValue', dateSaved || '', { shouldValidate: false });
  //   setValue('hourValue', selectedHour, { shouldValidate: false });
  //   setValue('minuteValue', selectedMinute, { shouldValidate: false });
  //   setValue('persons', personsValue, { shouldValidate: false });
  //
  //   // if (selectedHour === '' && selectedMinute === "" && personsValue === "" && date === "") {
  //   //   const timeSaved = localStorage.getItem('time');
  //   //   const personsSaved = localStorage.getItem('persons');
  //   //   const dateSaved = localStorage.getItem('date');
  //   //   const splitedTime = timeSaved ? timeSaved.split(':') : ['', ''];
  //   //   const hour = splitedTime[0];
  //   //   const minute = splitedTime[1];
  //   //
  //   //   setDate(dateSaved || '');
  //   //   setSelectedHour(hour || '');
  //   //   setSelectedMinute(minute || '');
  //   //   setPersonsValue(parseInt(personsSaved, 10) || 0);
  //   // }
  //
  // }, [setValue]);

  useEffect(() => {
    const timeSaved = localStorage.getItem('time');
    const personsSaved = localStorage.getItem('persons');
    const dateSaved = localStorage.getItem('date');

    const splitedTime = timeSaved ? timeSaved.split(':') : ['', ''];

    const [day, month, year] = dateSaved ? dateSaved.split('-') : ['', '', ''];
    const formattedDate = `${year}-${month}-${day}`;

    const hour = splitedTime[0];
    const minute = splitedTime[1];

    setDate(formattedDate || '');
    setSelectedHour(hour || '');
    setSelectedMinute(minute || '');
    setPersonsValue(parseInt(personsSaved, 10) || 0);

    setValue('dateValue', formattedDate || '', { shouldValidate: false });
    setValue('hourValue', hour || '', { shouldValidate: false });
    setValue('minuteValue', minute || '', { shouldValidate: false });
    setValue('personsValue', parseInt(personsSaved, 10) || 0, { shouldValidate: false });
  }, [setValue]);


  useEffect(() => {
    if (isValid) setIsAddressSelected(true);
  }, [isValid]);


  return (
    <>

      <Head>
        <title>Second-step</title>
      </Head>
      <Root>
        <Form onSubmit={handleSubmit(dataSubmit)}>
          <div className={'container'} onClick={() => router.push('/')}>
            <img src="/images/arrow-back.svg" alt="" />
            <Text>Выберите дату и время {timeTotal}</Text>
          </div>
          <div style={{ position: 'relative', width: '358px', height: '28px' }}>
            <Stepper canNavigateForward={true} url={'/'} id={1} left={0} />
            <Stepper canNavigateForward={isAddressSelected} url={'/Second'} id={2} left={110} />
            <Stepper canNavigateForward={isAddressSelected} url={'/third-stage'} id={3} left={220} />
            <Stepper canNavigateForward={isAddressSelected} url={'/fourth-stage'} id={4} left={328} />
            <img width={'100%'} alt={''} src={'/images/secondStage.svg'} />
          </div>
          <div style={{ position: 'relative', display: 'flex', width: '100%', flexDirection: 'column', gap: '8px' }}>
            <Text size={16}>Выберите дату</Text>
            <div style={{ width: '100%' }}>
              <div style={{ position: 'relative', width: 'fit-content' }}>
                <Input isDateInput
                       type={'date'}
                       isNotValid={errors?.dateValue}
                       value={date}
                       {...register('dateValue', {
                         required: 'Это обязательное поле',
                         onChange: (e) => setDate(e.target.value),
                       })}
                />
                <IconCalendar src="/images/icon-calendar.svg" alt="" />
              </div>
              {errors?.dateValue && <ErrorText>{errors.dateValue.message}</ErrorText>}
            </div>
          </div>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '8px' }}>
            <Text size={16}>Выберите время</Text>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <Input onClick={() => setSelectedHourMenu(!selectedHourMenu)}
                       value={selectedHour}
                       isTimeInput
                       isNotValid={errors?.hourValue}
                       readOnly
                       type="text"
                       pattern="\d{1,2}"
                       maxLength={2}
                       {...register('hourValue', {
                         required: 'Это обязательное поле',
                         onChange: (e) => setSelectedHour(e.target.value),
                       })}
                />
                {selectedHourMenu && (<ColumnHourWrapper isOpen={selectedHourMenu}>
                  <ColumnHour>
                    {itemsHours.map((hour, index) => (<TimeItem
                      key={index}
                      onClick={() => {
                        setSelectedHour(hour);
                        setSelectedHourMenu(false);
                      }}
                      style={{ color: selectedHour === hour ? '#9b51e0' : '#ffffff' }}>

                      {hour}
                    </TimeItem>))}
                  </ColumnHour>
                </ColumnHourWrapper>)}
              </div>
              <span className={'span'}>:</span>
              <div style={{ position: 'relative' }}>
                <Input onClick={() => setSelectedMinuteMenu(!selectedMinuteMenu)}
                       value={selectedMinute}
                       isTimeInput
                       readOnly
                       type="text"
                       isNotValid={errors?.minuteValue}
                       pattern="\d{1,2}"
                       maxLength={2}
                       {...register('minuteValue', {
                         required: 'Это обязательное поле',
                         onChange: (e) => setSelectedMinute(e.target.value),
                       })}
                />
                {selectedMinuteMenu && (<ColumnMinutesWrapper isOpen={selectedMinuteMenu}>
                  <ColumnMinutes>
                    {itemsMinutes.map((minute) => (<TimeItem
                      key={minute}
                      onClick={() => {
                        setSelectedMinute(minute);
                        setSelectedMinuteMenu(false);
                      }}
                      style={{ color: selectedMinute === minute ? '#9b51e0' : '#ffffff' }}
                    >
                      {minute}
                    </TimeItem>))}
                  </ColumnMinutes>
                </ColumnMinutesWrapper>)}
              </div>
            </div>
            {errors?.hourValue || errors?.minuteValue ? <ErrorText>Это обязательное поле</ErrorText> : ''}
          </div>

          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '8px' }}>
            <Text size={16}>Количество персон</Text>

            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Button isButtonPerson type={'button'} onClick={() => handleMinus()}>
                <img alt={''}
                     src={'/images/icon-minus.svg'}
                />
              </Button>
              <Input maxLength={2}
                     value={personsValue}
                     isPersonInput
                     readOnly
                     type={'number'}
                     isNotValid={errors?.personsValue || !personsValue}
                     {...register('personsValue', {
                       required: 'Это обязательное поле',
                     })}
              />
              <Button isButtonPerson type={'button'} onClick={() => handlePlus()}>
                <img alt={''}
                     src={'/images/icon-plus.svg'}
                />
              </Button>
            </div>
            {errors?.personsValue && <ErrorText>{errors.personsValue.message}</ErrorText>}
            {personsValue === 0 && <ErrorText>Это обязательное поле</ErrorText>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text isUppercase size={16}><CustomText isValid={isChecked}>Буду кальян</CustomText></Text>
            <CheckBox>
              <input className="inputTheme"
                     type="checkbox"
                     checked={isChecked}
                     onChange={(event) => setIsChecked(event.target.checked)}
                     id="themeSwitchButton"
              />
              <label className={'labelTheme'} htmlFor="themeSwitchButton" />
            </CheckBox>
          </div>

          <Button type={'submit'} isButtonSubmit>
            Продолжить
          </Button>
        </Form>
        <BackGround height={289} width={176} bottom={-1} left={197} src={'/images/smoke-1.png'} />
        <BackGround bottom={111} left={0} src={'/images/controller.png'} />
      </Root>
    </>
  );
};
export default Index;
