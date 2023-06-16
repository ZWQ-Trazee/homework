import React, { useState, useEffect } from 'react'

const cns = {
	output: '未比较',
	enter: '请输入一个数字',
	compb: '大了',
	comp: '比较',
	comps: '小了',
	guessr: '猜对了',
	res: '重置'
}
const eng = {
	output: 'not compared',
	enter: 'please enter a number',
	compb: 'bigger',
	comp: 'compare',
	comps: 'smaller',
	guessr: 'guess right',
	res: 'reset'
}
const obj = { backgroundColor: 'blue', color: 'white' }
export default function App () {

	const [guessnum, setguessnum] = useState(0)
	const [inputnum, setInputnum] = useState(0)
	const [lang, setlang] = useState(cns)

	function init () {
		let numb = Math.random()
		numb = Math.ceil(numb * 100)
		console.log(numb)
		return numb
	}

	function compare (a, b) {
		if (a > b) {
			setlang({ ...lang, output: lang.compb })
		} else if (a < b) {
			setlang({ ...lang, output: lang.comps })
		} else if (a === b) {
			setlang({ ...lang, output: lang.guessr })
		}
	}

	useEffect(() => {
		setguessnum(init())
	}, [])

	return (
		<>
			<div>
				{lang.enter}
				<input onChange={(e) => {
					setInputnum(Number(e.target.value))
				}}
				/>
				<button
					type="button"
					style={obj}
					onClick={() => {
						compare(inputnum, guessnum)
					}}
				>
					{lang.comp}

				</button>
				<button
					type="button"
					style={obj}
					onClick={() => {
						setguessnum(init()); setlang({ ...lang, output: '' })
					}}
				>
					{lang.res}
				</button>
				<input type="text" name="result" disabled="disabled" value={lang.output} />
				<select onChange={(e) => {
					console.log('e -->', e.target.value)
					if (e.target.value === 'cns') setlang(cns)
					else setlang(eng)
				}}
				>
					<option value='cns'>中文</option>
					<option value='eng'>英文</option>
				</select>
			</div>
		</>
	)
}



