import Input from "./Input.js"

const Add = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
    return (
      <>
        <div>
          <form onSubmit={onSubmit}>
            <Input text={'name'} value={nameValue} onChange={nameOnChange} />
            <Input text={'number'} value={numberValue} onChange={numberOnChange} />
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        </div>
      </>
    )
  }


  export default Add