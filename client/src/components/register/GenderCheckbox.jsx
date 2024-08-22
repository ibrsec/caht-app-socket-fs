
const GenderCheckbox = ({inputs,setInputs}) => {




  return (
    <div className="flex">
                <div className="form-control">
                    <label htmlFor="male" className="label gap-2 cursor-pointer">
                        <span className="label-text">Male</span>
                        <input id="male" type="radio" className="checkbox checkbox-success border-slate-900" name="gender" checked={inputs.gender==='male'?true:false} 
                        onChange={
                            (e)=>{e.target.checked && setInputs({...inputs,gender:'male'})}
                        } 
                         />
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="female" className="label gap-2 cursor-pointer">
                        <span className="label-text">Female</span>
                        <input id="female" type="radio" className="checkbox checkbox-success  border-slate-900" name="gender" 
                        checked={inputs.gender==='female'?true:false}
                        onChange={
                            (e)=>{e.target.checked && setInputs({...inputs,gender:'female'})}
                        } 
                        />
                    </label>
                </div>
            </div>
  )
}

export default GenderCheckbox