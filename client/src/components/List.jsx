import { Box, Flex, Image, Text, Button, Dialog, DialogContent, DialogOverlay, List, ListItem } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/modal";
import { Icon } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { socket, update, setUpdate, word } = props;
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    axios.get('http://localhost:8000/api/rides', { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setRides(res.data.filter(word2 => word2.location.toLowerCase().includes(word.toLowerCase())));
      })
      .catch(err => {
        console.log(err);
        err.response.status === 401 ? navigate('/') : console.log(err);
      });
    socket.on('toClient', (ride) => {
      setUpdate(!update);
    });
    return () => socket.removeAllListeners();
  }, [update, word]);

  const removeRide = (rideId) => {
    axios.delete('http://localhost:8000/api/removeRide/' + rideId)
      .then(e => {
        setUpdate(!update);
      });
  };

  const addRide = (rideId) => {
    axios.patch('http://localhost:8000/api/addRide/' + rideId, { userId })
      .then(e => {
        setUpdate(!update);
      });
  };

  const getPassangers = (inx) => {
    console.log(rides[inx].passangers);
    setUsers(rides[inx].passangers);
    setIsOpen(true);
  };

  return (
    <div>
      {rides ? rides.map((ride, index) => (
        <div key={index}>
          <Flex justifyContent="center" alignItems="center">
            <Box width="80%" padding="4" borderWidth="1px" borderRadius="md" _hover={{ outline: '2px solid teal' }}>
              <Flex alignItems="center">
                <Box marginRight={4}>
                  {<Image
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcVFRUXGBcZFxcdHBoZFxkaFx4XGhkZIBoaGh4gICwjGh0pIxodJDYkKS0vMzMzHSI4PjgyPSwyMzIBCwsLDw4PHhISHj0pIykyMjoyMjIyLzIyMjIyMzUvLzIzLzQ0NzUyMi80PTQvMjo9Mi8vMjMyMjIyLzIyMjIyMv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQYHAgQFA//EAEsQAAEBBQQGCAMFBgMHBAMAAAECAAMRITEEEkFRBSIyQmHwBhNSYoGRocFxseEHFDNygiOSorKz0hdU0RUWJUN0wvEkNWTDY3OU/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAEEAwIFBv/EACsRAQACAgEEAQMCBwEAAAAAAAABAgMRBBIhMUFRInGBE2EUFSOhscHwBf/aAAwDAQACEQMRAD8A24TemZQoM2kY6xkRQZsM5qkRQZtK6ypKFBnkwco7+PZ9GkYa2J3Wd7fy+nwZ3ht4j6MAG7rCZNRlGbUatJxrw5i0Eppmo1GWfqwS2JxrjDmbAAu6omDU5YMhDVwO8wCEkzSanLP0ZCGqNjE/VgQ3MO16sIjqmQGObTu7na+tKtSI6pkkUObAIvSMgKHNqTemZQoM2hEZKkBQ5sM5rkRTiwCY6xkRQZwax38ez6NxrNUlCgzya97fy+nwYEYa2J3WA3dYTJqMozZ3ht4j6MEppmo1GWfqwUatJxrw5i0Au6omDU5YMEtica4w5mwCEkzSanLkMFhDUqDi0huYdr1ZCGqNjE/Vp3dztfWlWCwjqmQGObCL0jIChzZCOqZJFDnzNhEZKkBQ5sFJvTMoU4tIx1jIigzgwzmqRFOLSs1SUKDPJg5R38ez6NIw1sTus72/l9PgzvDaxH0YAN3WEyajKM2o1aTjXhzFoJTTNRqMs/VglsTjXGHM2Cfdk9v5MZ1SO16j/RjByPfru8hp+bbw9uGbDLamd1oclbWB+XuwX+pz4UZ8NvHmmTOG/nzwa8Bt4lgg7u1ve9ZVYO5+rk+LBOSZK3j8/VgnsS7XPmwQd3Z3ves6NfhsY81yaCc0yTvD5+jXiNjEMD+nz41Ye9sYe3HNnHcy54tDmrZwHy92Cnv7O7yGp79d3kNDLbmMGpltzODBPzbeHtwrFn9Tnwow5K28D8mvDfz54MD4bePNG4ju7e971lVuXAbeJaCckyVvH5+rAHc/VyfFp+XZ3vevBqJ7Mu1z5tBOaZJ3h8/Rgvw2Mea5M/p8+NWcRsYhnHcy54sD82xh7cc2Hv7O7yGnFWxgOfFhltTTusFPfru8jwZ+bbw9uFWpltzODQ5KmrA/L1YH8+HNKM+G3jzRrw38+eDOA28SwcR3dve9+FW5Dufq5Pi0E5JkrE/P1YJ7Mu1z5sEg65ixl93kxgpF2Spk0NYebIQ1TNRocvGrIXZbUccmQhqVjjlH/wAMCG7vdr1rWjSEdUbQqr61aw3P4vXmbIR1Mt5ggEdVMlCpzajW2dWFcI+XwLIXtWkMc4SabXdu+vMGCic0ySKjNpGOsJJFU/SjWN7WpDDOE2RjrUhu5sE7272fSlKtSYaxmk0GXhRkd/8Ah9OZNIw16x3cuYMFJuzVMGgrDzYRdkqZNDWHmyN2dY4ZNIXZbUccmBCGqZqNDl7tYbu92vrVkLupWOOUWQ3P4vXmbBIR1RtCqvrVgEdVMlCpzawjqZbzIXtWkMc4SYA1tnVhXCPl4sBjNMgKjNm13bvrzBkb2tS7hniwSMdYSSKpz8KM7272fSlKtYx16QwbpvrdOKR50+rccuemKN2l7rjtedQ7cYaxmk0GXhRqTdmqYNBWHm3mi2qBjLyk33cW6BN4V8m4Y+fhvOt6+73bj2rG3bhdkqZNMYebQiGqZqNDl7tYXZbUccmQu6lY45Rba4kN3e7X1qyG6NrtfWrIbn8XrzNkI6mW8wQCOqJKFTm1Gts6sK4R8mQvatIY5wkza7t315gwTr0dj0DGv3nuc+TRgoF2SZg1OXkwS1RNJqcvZqJbExi3ESknZxPz9mB3d3tetaVZCOqdkUV9aNeG5nzxZwOxgWARHVMkihzYdba1YUwj5/ANDOSpJ3T8vRqZ7UobPHmTBCY6ypEUGbedpnTTmzJDx8q6d1AEVqhkmuNZASm3a0hbEunS3ryXVpKoDGFAOJMvFtbaC0W80paHlotCj1YIBAJETVLlB3UpBiTWeaiRYhJl3X/2irUv9jZxHC8pS1EZ3UgQ8y3Kx/aMpKz11nhncUQofoVX94NnVjsjt0kJdIS7huJAA+JzMJxLfPSOjXT9Nx67SsmoUJp4pNUniCzcGpNGaTdPnfWOFh4DUCMQawUKpPxbtgXZJ1ganLybV1pdPNE2tK3aitysUO8gHWQoUvpjEHiMyG2e5WkpCnZvJUAY90iII8CyYIlzEtUTSanL2ZDd3e19aMEpJ2MT82cNzPni0VIR1TsiivrRqZ6pkkUObOB2MCwzkqScD8vRgHW2tWFMI+fwYTGapEUGbDPalDZ48yYZzVJQoPl6sHS0g9JgCIEifww926Ldi3E3jGsA3Xb8zzMk3zTv12fSw1iKQrGMbK7O/YHxgUwj/o3aEtUTSanL2bz9HxvGHZMfhERb0BKSZpxPz9G/R8DJN8Mb9dnzc9Yi86WG7u9r60ZDd3e19aM4bmfPFnA7GBba4hnqmSRQ5sOttasKYR82GclSTgfl6MM9qUNnnyYHXr7PoWNesedkc+LGCDuU3uSwd3Yx9+NIME5pkBUZsE5pkkVGebA/p8+NWfHYw5qzvbmX0+LI7x2MAwPzbO77UnRujpfSbuzOy8fnVGyBVSsEpGJPHImgLd0mE1TSaDLL0bWnSVS7dpJNlCiHbtVyWErz1fxldEeyM2sQky+Nq0nbtKFTt0iDmIBSIBNQRfeHaMYGAhhJvs76BW1AF1+7SuoSl49A/eCKtsSyWRDl2l0hISEiCAKDiTWMZk4t2O6drAtdmmI9ErJpB29eItLwlCUi7eUHhUomqV7UAAYhWYk2Xfl28ffhkzu7+f1+DKyElCpzbyrEftJcoVYwreQ9QY8VBQI9fQN2uhGkna7K5dpeJ6xCIKReF8JSSEyM4XQKN62ltFO7W7Dt4CQlQUYKKYqAIBiK1LYZpboIpKkvLEpQKVCKVrulPfQsTgMQZ1hGjeo8aT22CO7sY+/GkGf0+fGrfCxJeB2jrFBSkpAWQm6FKAmQmdeYN94725lzxbyp8djDmrT82zu+1J0ax3jsYBhMJqmk0GWXowD3/wBPI8Gh7+1u+1OLUy25xpw5k0MpKmo0OXJYOnpB2ZE1Ffhh7t0W9ojdM1GhbpvLECYJMDlh4Gvo3yObwrXt109+Ya8OeIjUui1bsJsaiSJRHGTfd1YomsSPL6thx8LNada193e2ekR5LA6IBUMa/lbtfl2N7340aiexICvFoJzTJIqM82/QYcUY8cVj0wXtNrblf5Mea1Z8djDmrI725lzxZHeOxgG6vCfm2d32pOjU9/8ATyPBhlNU0mgyy9GGW3ONOHMmCweZ/JjTqnnaHmf9GMAG9MSAqM2Ax1hICozak3pmUKDNoTHXMiMM2BHf3ez6MjDXwO61jv49n0aRhrYndYBN3WMwaDKM285zoSzunxfh2OtWVEqvLqoxVImE45N6IN3WEyajKM2DUpONeHMWCEXdUzJocsGsIauJ3mAXdUTBqcsGQhqYHeYHc3u16shHVEiKnNsd6W9JBY3aUhIW8XG5EwTAQJUqGAJAhj4FsZHSfSqkiFlJTIiFlfQhhAxmGuk2+umelVre2hbixCAQVJilKStZSYKUSqSUxkPCc4D5/wDHsl+VlHs3hWBVus7xT1Fneha4xvOHsJqCjAQGIbNOjXTNdoKna0JS9SIyBuqAIBkTFJERKLccmX9PczHaNePP5eop1ajfd4j20acSdbrB+mzQ9BBvk90tpd2C8Wpd1M1RduSmArEJTGHFs2t9uggvFkBKEqUYDACJ+Jk2Bv8ApFa7SHiXNnKnZBSbrt48UAoEaykyBgcvNsuPlZc15/TiOmPc9nW2KtK/VM7Z10V0797c9apIC0qurSI3b0AQpMcCDHgYicIt7hN3WMwaDKM21JoW26QsaVB3ZngCzE9ZZ3pnCEqN6th6d2l08H3tyAhVYO1u1gRmoBRN4DL1bfMxvThE9mxjq1nGnDmLQi7qmZNDlg1Qq7NOsFTlzxbB+mPSd47X9zspJeqgFLSIqBVRDsdsxEThGU5ixBMsrt2lHDjVevkIUZgqWAqHAVbrWbpJY3hCE2l3eNCVXSeAvQjk2J6L+z0qgq1PFBSplLsgkE9tagQVZwHiW71r+zqzqiHbx6gwkpRStEeIgD5KZ2O7NBPVEiN7PmLAL0hIipzbV1lt9q0W9Dl/FbgmQBKklOK3RNCIzRL1Cm2a5epeoSpKhcKQUqFFJIkR4MmCJfQG9MShXiwG9rCQFRnBqTemZQpxabWsZEYZwaKR393s+jIw18DutY7+PZ9GkYa2J3WATd1jMGgyjNqdWs404cxaA3dYTJqMozajVpONeHMWB92V2z6/6sbj92T2vkxgpnNUiKDNpXWMlCgzybke/Xd5DT823h7cM2Cd7f7P0rRr3ht4j6M/qc+FGvw28eaMEEppmo1GWfqwauxONcYczYO7tb3v6sHc/VyfFgAQkmaTU5Z+jIQ1RsYn6s/Ls73v6M+GxjzXJg1x9oyP/V2cCabg4/8AMm2xbbaSiEBGMfSDYXb/ALQEunrxz1CldWtSI9YBG6oiOzKMIt1z9pKKGzKhgOsH9reclbWpqs6n5KzWLbnuyy02lSwAQAAYtgGiU/8AFXst57g3pn7SkGRsyiMP2g/tZ/iUg1s6jl+0H9rZK8O8dU2tuZjXh1nNWdajWpeh0mH/AKR9+T3Dc/s1N2xPDCYevD5IQ3lj7SkGZs6o4HrB/a1/xKRX7uq9n1g+V1unG4s4aTWJ3v285MsXmJZdaLYpYhABsE+0ROo6lvPPklu5/iUiv3dUc+sH9rX/ABKQJizqBNf2g/tbnTh3rljJa25h6nNWazWI09q29I3VicOb15S1ukQQBGN1KYzkABeEZx4NrbQ2my5fqtBdpevDfmokQUs6yxDGZHwJbZWi37nSbkPFuBBD06q1XtYJE8IghZlSU29907ShN12kJQKhIAAHAfDJt+9OGtsO0H0+dvVocvHSkF4oJBQrrBE0jIFI8C2ad3c7X1pVusrR7kvEvQ6ReTH9pdF8RBBnWh9W7X9Pnxq0lYeD0z0eH1kegj8NJeIVjeQCYA8U3h4t5v2bWvrLKp2oydPCEmO6oBUJ8Sr0bJdKu1rcPUIhFTt4lETAX1JITHGE21mmxaR0akrCR1ZIKoXXjswpfG0kcZfFrHhJ8trwjNUiKYRaGc1SUKDPJvH6Nafd2x2VnVWggKRkTQjNJhI8CMG9n823h7cKt5ejvb/Z+laM7w2sR9Ks/nw5pRr8NvHmjBBKaZqNRln6sGrszjXGHM2g7u3ve/Crch3P1cnxYOPUo7XqGMg7z+bGCmW1M7rTgrbwPy92pF2Spk0NYebIQ1TNRocvGrBeG/nzwZwG3iW4w3d/teta0awjqjaFVfWrAE5JkrePz9WCexLtc+bQCOqmShU5tRrbOrCuEfLxYIJzTJO8Pn6NRmNjEMBjNMkiozbEPtA091Dnqnarq3oIIErruilSoTsj9RwZA+WlOltgQtaA763aBUh27IvZ3lEFU8RFsS6HaZs9lL37w6U8Cw7u3UIVApvxOuoQjeFMmzPoh0NdJs6V2l0lbxetBYjcTuphgYTPEwwb3/8Adaxf5V1+4G9bh51LEx03sE71leEYfsXP97cnHTSwqUEmyriogA9U5gCTCeu2Vf7rWL/Kuv3A1T0YsYIIszoEEEG4KijNwvd5nSLSVlsQQX1nvld+6Xbt0YXLtbxT2uLctNaQs1lcu3zxxe6xSQm47dki8kqEYkCiSG9vSGjHD+71ztDy7G7eAMIwjD4wHk1tmjXL1CXbx2haEkFKVCIBAIBHgSPFoMGV02sEJWV5ez6lz/e2M9ENMObMp4XzsrvhAEEIXCBVEm8RCoo20/8Adaxf5V1+4G4POiliUCPuzsRBEQmB8CJg8Wu4TUvpoe2OXzsLsxTcjrXU3daUimElfTg3dE5pkneHz9G1p0bersFvXZFqIQ8UEBRkCaul/qBumGKu62zAYzTICozaTCxJxGxiOfBnHcy54tIx1hJIqn6UZ3tzs+lKVaKcVbOA+XuxQENcRSaCsjgfBrGGsZpNBl4UYTdmqYNBWHmwYh0b6LPbHa3jwqd9UsPEpSlSioArBdxBSBEAQriWy85K2sD8vVhF2Spk0xh5tIQ1TNRocvdkyLw38Dzwa8Bt4lpDd3u19ashujaxV9asAZJkrePz9WCezLtc+bQCOqmShU5tyGtsyhXCPl4sHG+7yYzr0dj0DGDlC7KsccmkIalY45R/8MAuyTMGpy8mAQ1RNJqcvZgQ3P4vVkI6uW80hubva9a0ZCOqdkUVzJgsL2rSGOcJM2u7d9eYMIjqmQFDm3F4oEErISEgmJkIYmJwEGD4221pdu1vlm6l2CpXECcBxNAMy2vejFjXpG2rtb4fs3agbtU3h+G7GYSIE5yiNZufSPTC9JPndjsoii9FS53VQ3j/APjTXiYQwj7mmdJI0VZ3TlwhK1RmFEgkQJLxRGJUPnCjeoiXmZj2zZjau/xMff5dH7ymf4mPv8uj95TOmTrhtFjau/xMff5dH7ymH7S3/wDl3f7ymdMnXD3CP+Kfr/8ApbMmw7Ro6+3Kfu5oSQTGRgp0UiXxSW8N59pD4KI6h3IkbSsC3fNHeI+Ihi4fi0+ptMx+7aDG1d/iY+/y6P3lM/xMff5dH7ym4dMtvXD1vtN0L1jpNpQNd1JcKl0TX9KjHgFKODet0U0v97syHij+0RqLGa0gGP6hA+JybwtB9Nl2t+izPHDsIeX0qmo6vVrJEDIxhDxboP8AoVbbMtS7G9vJjEBLwu3kIm6FA6i4DEnwZr1Jv3DY0Y61IbubWO//AA+ja0HS632VQ+9Ob0JReILsn4LSLh8AW92wdP7K8MXgW6X3heRlJSYnxIDTUruGWRhr1ju5cwaxuzrHDJuvY7c6eC+6eIeRqEKCofGEx4t9wbs0zJqMvJoqwuS2o+jIXdSsccoyYBdknWBrw8mAQ1RNJqcvZgsNz+L1aQjq5bzIbu72uZMhu7va5kwWF7VpDHOEmm13bvrzBhEdUySKHNh1trVhTj5sD7z3OfJo3Lr19g+RaMFEtiYNW4iUkzTifn7NR3Kb3JYO7sY+/GkGBw3M+eLOB2MCz+nz41Z8djDmrAM5KkkUOeXo2uumGkn9stYsDmSQq6oRgFLheUVnsIApmDIybYv5tnd9qTo2uui//vL+PbtP9RrCSyGxWOz6LcwGu+UJmiln/sQMvmWxi1WhTxSlqMVKMT7AcBRu/wBJiTannAoHh1aZNi1otjx48DpwkqWTAXRFROITwGJ+NIRb6GKKYqRefMvhZ7ZeVlmlfET/ANMvVY3Nz9n9sWm8t67So7pWtRHBRAgD8CW8rSNgtdiUA+TeQTAKCip2TkFQik1kQKGRa15VZnvC3/8ANyRXcTt9NI2/qrurG9HGFIcOLcNH6SL1RTdAgmO1HEDLi3bs75LxIUmh8xmC31g3fUzbqie3wydVK16bV+r53P8AhlfQWr74O/8AvbCNNaTLp8tN0HWUY3obyuHBs36C1ffB3/3tjNrH7Rf51/zFuERM5banXhpm1a8fHNo3HftvXt5+jrb1gUYQgQKxbuRaNW1VrMRqZ2wXtFrTNe0fAC3pWTTlod0eFQyVrjzM/It5hLeUh8+tLzqrMhRJykYCqiTJCeMsM4NyzWpWPq7tHFx5r2/pzr92wbP0tBF166iDUpMQf0qw8S3xe6I0XaaJS7WewS6VE93ZUfAtj6fs7thES+dX8r7w+arvs3jWtFpsbwO7QgwNCTeBGaFb3wNJRg2DWK0/D6+uRjrvcW+/aWSWz7OFoN+y2iY2b8UKH60f2huou26XsIvPApbsVKwl6iGalpN8fFRDcrDpJ4gAu3ikgzEDq/umXo2Q9DOkirYXjt4gEJQkxIEwqIIUKGjMuGaRve143LjNMxETEx5+HodGdOotbq+gXVAweIJiUnAgyikzgeBxBb1xKSZpxPz9G1x0HSXWkrQ6QYIAfJh3Xb4BPiBHzLbH/Lsb3vxo3CYbYleG5nzxZwOxgWfyY81qz47GHNWihnJUkih+Xowz2pQ2ePMmn5tnd9qTo3I9/wDTyPBgdY87I58WM/acwaMATmmQFRmwTmmSRUZ5sBvTEgKjNgMdYSAqM2B3tzLnizvHYwDI7+72fRpGGtundYKZTVNJoMsvRtddFv8A3l/+e1f1G2KTd1jMGgyjNtZ2zQOkXdsfP3DspvvXpSsLdRKFrJopUoiFRFrCS+/TN4UvrQoV1YfEu0AfNu19ndmdubK/tixEgLniHbtIUoDIkxj+VLfR70YfvbOVP1n7ytCopIQQVgkIBUkwmAmYbrfZzpBCnb2wvZFd8pBkVJUm68R+YQJhWZyLd8uSLRER6hk42K1LWmY8zM/j08xza9J23rH7p4tKHZjdQ8uJEo3EgQvkDtZ+DZL0T0l/tKyvnFpgpSQkFUACUrBuLhQLBSaZAt4KuimkrMp47syip0uRUhaERTheCiClUKlPm2QaHsSNE2R69fKSXioEhJkVAHq3SMTUkmGJNA3GWqGB6FJSt47NRXK8k3T7eTew16D9H1WkPXq1lIiEg3Y3lGazUSp5nJuNs6NaQ6x51SCp2FKuqvuhFMZGBVESwbbi5FKViJ8vkcjg3yZZtXtDK+gxm++Dv/vbGbX+Iv8AOv8AmLfOx6K0u7Ci7CkgwvQW5nCMKq4nzbrq6PaUMVF2ZmJPWOak/maV5FYyWt86e78K9sNabjcb/u7DG656OaUhHqzD/wDY5/uaHo5pQCPVmBp+0c/3N1/i6M38ryfMPhpl5ddmG8QnwmT8my3o8U2HRarUEhTxYvmOJUu46ScboiDDirNun0h6KKTZCu8VLSlKyi6N0C/MExIBUZVg3Z6Jvndt0euxLVdWhJHG7evO1gYhJgCO7OobLyMkXtuPD6PCwzipq0d9seTadKLdKtofPOrSTRYAgDAkO9kpBlMYYtk/XjSWi3ilpHWuwuYoHrtN4EZBSSAfzFvAPRbSiEKsqTFypUTB4gOzOs9cDEgDwLe9pEO9F6OLi+FPXgWBCRUtYgtYGCUCEzkkVLcJbGF6CexdqB3TL4ER+cW2T0X0CqzKWpQdi8lIFzgTXVGbYt0M6L9a46xSii+SUiEYoEADUVMfCGbRLnTpJAUuXfs/+raMmXdIrH5YsXGmue15jt21/vZ0UB/2vaodq1eXXCLbGE5pkkVGebYD0M0Fa3dsW/fu4BSHl5d92YrWtKjEJVjAmkGz4GOsJAVGcGzS3Qd7cy54s7x2MAyO/u9n0aRhrbp3WiqZTVNJoMsvRhltzjThzJhN3WMwaDKM2p1azjThzFgdW87Q8z/oxnUK7Z9WjBSb0zKGGbSMdYyIwzh/5YZzVIigpFpXWMlCgz8GDlHfx7Po0jDWxO6072/2fpWjXvDaxH0qwI3dYTJwyjNsB0hpXSqHz1Lp0suw9WEEOLwKAo3THGWLZ8JTTNRqMs/VoNXZnGuMOZtYSWuRpjTABAcLh/07eDbNFW568L02Z6lZIUSh2pGsN4QoqM4jGbblhCSZpNTlyGkIao2TU/WjXaaa0s+ldNITd6t8rIrcXlfvXZ+MW8jSNg0laFXnzq0PFCkUEAflSAEp8A24u7udr60q1IjqmSRQ5+LNmmsbLb9KunaHbuzKShAgkCznkk1JxJi33VpnTJhFyuX/AMdtjkXpKkBQ0iw601SIoKRabXTXCtM6YjHqVx/6dn+2dMRj1K4/9O2xq6xkoUGbO9v9n6VozZp4NttVrTYUvXaSbUUuryOriQolIXqYQEfg1sNqtf3BT1aD96KHsEdXA3gpfV6nEBMsYt73eG1iPpVglNM1Goyz9WDXCdM6YEYOVz/+O2PJ0Pbkr6xFnfO13ioF27Wm6T2YUHCkJNugauzONcYeXiwCEkzSanLkNdpprVOmNNBN3q3pMNo2cXv5YejeFa9E296svHjh+8WYRK0LMhhwHAQbc0Iaomk1P1ozu7na+tKs2aa3TpXS4SEhwoJSAABZ4AACAAlRuS9MaYIgXC//AOdtjwjqmSRQ5+LCIyVIChpFptdMQ6M6Q0g9f3bW7Uh2HaiCXVzXBTAR85Nl+1rGRGGcGHWmqRFMItK6ypKFBnk0Vyjv49n0aRhrYndZ3t/s/StGd4bWI+lWBG7rCZOGUZtRqUnH05i0Eppmo1GWfq1GrszjXGHM2Dj92HaYzqUdr1DGDke/Xd5DT823h7cM2GW1M7rOCtrA/L3YH8+XMqM+G3iOZM4b+fPBrwG3iWCDu7W97+rB3P1cnxYMk7W8fn6sE9iXa582B+XZ3vf0Z8NjHmuTB3ZJ3vf0ZxGxiGB/JnzOrD3tjD245s47mXPFoc1bOA+XuwU9/Z3eQ1Pfru8hoZbcxusMtqZ3WB+bbw9uFYs/ny5lRhyVtYH5erXhv588GCfDbxHMmDu7W97+rXgNvEtBkna3j8/Vgo7n6uT4tPy7O97+jBPZl2ufNg7sk73v6MD4bGPNcmfyZ8zqziNjEc+DOO5lzxYH5tjD245sPf2d3kNOKtnAfL3YZbU07rBT367vI8Gfm28PbhVhltTO6w5K2sD8vVgfz4DmVGfDbxHMmcN/A88GvAbeJYIO7tb3v6tR3P1cnxaDJO1vH5+rBPZl2ufNgl13n82MvO8vmxgpF2Spk0NYebKapmo0OXjVrC7KsccmkIatY45R/wDDBO7v9r61o1hHVG0Kq+tWsNz+L1aQjq5bzBAIyTJQqc2o1tmUK4R8vFrC9q0hjnCTQa3du+vMGADGaZJFRm0jHWEkiqfpRrG9rUhhnCbIx1qQ3WCR3tzs+lKVakw1jNJoMvCjI7/8PoyMNescMuYMAm7NUwaCsPNhF2Spk0NYebUm7OscMmkLstqOOTApqmajQ5eNWkN3f7X1rRrC7qVjjlFrDc/i9WCQ3RtYq+tWgEdVMlCpzawjq5bzWF7VpDHOEmANbZlCuEfLxaAxmmSRUZs2u7d9eYMje1qQwzxYJGOsJJFU/SjO9udn0pSrWMdakN3NrHf/AIfRgkYaxmk0GXhRhN2apg0FYebIw16xwy5g1JuzrHDJgh1ZKmTTGHm0IhqmajQ5e7WF2W1H0awu6tY45RYJDd3u19ashujaxV9atYbn8Xq0hHVy3mCCeqmShU5tyGtsyhXCPl4she1aQxzhJoNfuw9eYMHHr0dn0DVr957nPk0YFl2Vc4Mc/hq8fkGMYA/D5zYv8Mc5sYwH/wCGnw+TW1bnOTRjByf7afD5sX+IPh/qxjA/5nOTR1+Ir4H5hjGC2baX8fctxstFc4FjGA4/DV4/IMH4Z5xYxgL/AAxzmx/+Gnw+TGMFte7zk1tO2j4j5tGMFefiJ+H+rP8Amc5NGMFdfiK+B+YZZtpfx9yxjBxstFc5scfhq8fkGMYCfwzzixX4Y5xYxgP/AMNPh8mtq3ecmMYO2xjGD//Z"
                    boxSize={20}
                    borderRadius="full"
                  />}
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="bold">{ride.driver ? ride.driver[0].firstName : "ska "}</Text>
                  <Text fontSize="md" color="gray.500">Location: {ride.location}</Text>
                  <Text fontSize="md" color="gray.500">Ora: {ride.hour}:{ride.minutes === 0 ? "00" : ride.minutes} {ride.amPM}</Text>
                  <Box display="flex" alignItems="start" justifyContent="space-around">
                    <Text fontSize="md" color="gray.500"> {ride.passangers.length} / {ride.people}</Text>
                    {ride.driver[0]._id === userId ?
                      <Image src='https://cdn-icons-png.flaticon.com/512/17/17181.png' onClick={() => getPassangers(index)} width={5} height={5} /> :
                      <Image src='https://cdn-icons-png.flaticon.com/512/17/17181.png' width={5} height={5} />}
                  </Box>
                </Box>
                <Box marginLeft="auto">
                  <Text fontSize="md" color="gray.500">Price: ALL{ride.price}  </Text>

                  {ride.driver[0]._id === userId ?
                    <Button colorScheme="teal" onClick={() => { removeRide(ride._id) }}>Remove This Ride</Button> :
                    ride.passangers.includes(userId) ? "rezervove" :
                      ride.passangers.length < ride.people ?
                        <Button colorScheme="teal" onClick={() => { addRide(ride._id) }} >Get a Seat</Button> : "Seats Reserved"}
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Passengers</ModalHeader>
              <ModalBody>
                <List>
                  {users.map((user) => (
                    <ListItem key={user.id}>{user.firstName}</ListItem>
                  ))}
                </List>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" onClick={() => setIsOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )) : ""}
    </div>
  );
}

export default Profile;
