import React, { Component } from "react";

import { firestore, auth } from "../firebase";

import Authentication from "./Authentication";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utlities";

class Application extends Component {
    state = {
        posts: [],
        user: null
    };

    unsubscribeFromFirestore = null;
    unsubscribeFromAuth = null;

    componentDidMount = async () => {
        this.unsubscribeFromFirestore = firestore
            .collection("posts")
            .onSnapshot(snapshot => {
                const posts = snapshot.docs.map(collectIdsAndDocs);
                this.setState({ posts });
            });

        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            console.log(user);
            this.setState({ user });
        });
    };

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    };

    handleCreate = async post => {
        firestore.collection("posts").add(post);
    };

    handleRemove = async id => {
        firestore.doc(`posts/${id}`).delete();
    };

    render() {
        const { posts, user } = this.state;

        return (
            <main className="Application">
                <h1>Think Piece</h1>
                <Authentication user={user} />
                <Posts
                    posts={posts}
                    onCreate={this.handleCreate}
                    onRemove={this.handleRemove}
                />
            </main>
        );
    }
}

export default Application;
