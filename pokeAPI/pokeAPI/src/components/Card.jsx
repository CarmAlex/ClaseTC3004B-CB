export const Card = ({id, imagen}) => {
    return (
        <section style={{height :200}}>
            <h2 className="text-capitalize">
                #{id}
            </h2>

            {/* */}

            <div>
                <img src={imagen} height={200}/>
            </div>

        </section>
    )
}