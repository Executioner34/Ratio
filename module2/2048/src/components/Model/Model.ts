class Model {
	url: string;

	constructor() {
		this.url = 'http://localhost:8080/api/v1/record/';
	}

	public async getData() {
		let response = await fetch(this.url);
		let data = await response.json();
		return data;
	}

	public async postData(user: { username: string }) {
		let response = await fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(user),
		});
		let result = await response.text();
		console.log(result);
	}
}

export { Model };
