import React, { useState, useEffect, createElement, Children } from "react"
import { } from "react-native"

export const Navigator = ({ selected, children }) => {

    useEffect(() => {
        null
    }, [selected])

    return (
        // children.filter((item, index)=>index === selected)
        children[selected]
    )
}