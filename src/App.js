import { useEffect, useState } from 'react';
import axios from 'axios';
const key = process.env.REACT_APP_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const onTextChange = (e) => {
    setInput(e.target.value);
  };
  const request = async () => {
    try {
      const response = await axios.get(
        `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${key}&data=AP01`,
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    request();
  }, []);
  function stringToNumber(string) {
    return Number(string.split(',').join(''));
  }
  let checkNum = /[0-9]/;

  return (
    <div>
      {data
        ?.filter((el) => el['cur_unit'] === 'USD')
        .map((val) => {
          return (
            <>
              <div key={val.cur_nm}>화폐단위 : {val.cur_nm}</div>
              <div>매매기준율 : {val.deal_bas_r}원</div>
              <input
                placeholder="외화를 입력하세요"
                onChange={onTextChange}
                value={input}
                type="number"
              />
              <div>
                {checkNum.test(input)
                  ? `${input} ${val.cur_nm} => 
                ${(
                  stringToNumber(val.deal_bas_r) * input
                ).toLocaleString()} 원 입니다.`
                  : `숫자를 입력하세요.`}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default App;
