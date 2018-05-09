

import React, { Component } from 'react';

class EditFishForm extends Component {

    handleChange = (key, event) => {
        console.log(event);
        const editedFish = { ...this.props.fish, [event.target.name]: event.target.value }

        this.props.editFish(editedFish, key)
    }

    handleClick = (key, event) => {
        event.preventDefault()
        this.props.deleteFish(key)
    }

    render() {

        const editForm = Object.keys(this.props.fishes).map(key => {

            const { name, status, price, image, desc } = this.props.fishes[key]
            return (
                <form key={key} className="fish-edit">
                    <input name="name" type="text" placeholder="Name" value={name} onChange={(event) => this.handleChange(key, event)} />
                    <input name="price"
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(event) => this.handleChange(key, event)}
                    />
                    <select name="status" value={status} onChange={(event) => this.handleChange(key, event)} >
                        <option value="available">Fresh</option>
                        <option value="unaivailable">Sold out !</option>
                    </select>
                    <textarea name="desc" placeholder="Desc" value={desc} onChange={(event) => this.handleChange(key, event)} />
                    <input
                        name="image"
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(event) => this.handleChange(key, event)}
                    />
                    <button onClick={(event) => this.handleClick(key, event)}>Delete Fish</button>
                </form >
            )
        })
        return (
            <div>
                {editForm}
            </div >
        );
    }
}

export default EditFishForm;