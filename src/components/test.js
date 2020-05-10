const stripe = () => {
  
    return({
    "id": "evt_1GgYeIAaUD8nQT7t0JECjfy5",
    "object": "event",
    "api_version": "2019-02-11",
    "created": 1588953726,
    "data": {
      "object": {
        "id": "tr_1GgYeHAaUD8nQT7tszuyX0mF",
        "object": "transfer",
        "amount": 34500,
        "amount_reversed": 0,
        "balance_transaction": "txn_1GgYeHAaUD8nQT7t3Aqh29WD",
        "created": 1588953725,
        "currency": "usd",
        "description": null,
        "destination": "acct_1Gf4sZIuPwUzqO9q",
        "destination_payment": "py_1GgYeHIuPwUzqO9q4rok79rY",
        "livemode": false,
        "metadata": {
        },
        "reversals": {
          "object": "list",
          "data": [
          ],
          "has_more": false,
          "total_count": 0,
          "url": "/v1/transfers/tr_1GgYeHAaUD8nQT7tszuyX0mF/reversals"
        },
        "reversed": false,
        "source_transaction": null,
        "source_type": "card",
        "transfer_group": "85XL"
      }
    },
    "livemode": false,
    "pending_webhooks": 1,
    "request": {
      "id": "req_QieDgdO3OPRu0S",
      "idempotency_key": null
    },
    "type": "transfer.created"
  })
  }
  
  const getstripe = stripe();
  const transferid = getstripe.data.object.id
  const amount = getstripe.data.object.amount;
  let created =getstripe.created;
  const destination = getstripe.data.object.destination;
  const invoiceid = getstripe.data.object.transfer_group;
  const UTCString = (dateobj) => {
    const zeroPadding = (num) => {
       if (num < 10) {
     num = `0${num}`
   
   }
      return num
      
    }
    const getOffsetTime = (timein) => {
      let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
  let offset = datein.getTimezoneOffset() / 60;
  
   return offset;
  
  }
  
   let month = dateobj.getMonth()+1;
    month = zeroPadding(month)
    let day = dateobj.getDate();
    day = zeroPadding(day)
    let year =dateobj.getFullYear();
    let hours = dateobj.getHours();
    let minutes = dateobj.getMinutes();
    let seconds = dateobj.getSeconds();
    seconds = zeroPadding(seconds)
    minutes = zeroPadding(minutes)
    hours = zeroPadding(hours);
    let timein = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    let offset = getOffsetTime(timein)*2;
    let sym = '+';
    if(offset >0) {
      sym = '-';
    }
  if (Math.abs(offset) < 10) {
   offset = `0${offset}`
  }
    
    const newDate = new Date(`${timein}${sym}${offset}:00`)
    hours = newDate.getHours();
    hours = zeroPadding(hours)
    year = newDate.getFullYear();
    day = newDate.getDate();
    day = zeroPadding(day);
    month = newDate.getMonth()+1;
    month = zeroPadding(month);
    minutes = newDate.getMinutes();
    minutes = zeroPadding(minutes);
    seconds = newDate.getSeconds(seconds);
    seconds = zeroPadding(seconds);
    
    timein = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return timein
  }
  
  created = new Date(getstripe.created*1000)
  created = UTCString(created)
  
  const createTransfer = (transferid,created,amount,destination,invoiceid) => {
    return({transferid,created,amount,destination,invoiceid})
  }
  const transfer = createTransfer(transferid,created,amount,destination,invoiceid)
  console.log(transfer)