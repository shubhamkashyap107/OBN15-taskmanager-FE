import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [data, setData] = useState([])
  const nav = useNavigate()
  const pendingRef = useRef(null)
  const workingRef = useRef(null)
  const completedRef = useRef(null)

  const priorityStyles = {
    high: "bg-red-100 text-red-700 border border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    low: "bg-green-100 text-green-700 border border-green-200",
  }

  useEffect(() => {

    async function getData() {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/tasks",
        { withCredentials: true }
      )

      setData(res.data.data)
    }

    getData()

  }, [])

  const TaskCard = ({ item }) => {
    return (
      <article
        onDragStart={(e) => {
          e.dataTransfer.setData("yedraghorhahai", e.target.id)
          // console.log(e.target.id)
        }}  
        key={item._id}
        id={item._id}
        draggable={true}
        className="
          group
          bg-white
          border border-gray-200
          rounded-xl
          p-4
          cursor-grab
          active:cursor-grabbing
          shadow-sm
          hover:shadow-md
          hover:border-gray-300
          transition-all duration-200
        "
      >

        {/* Top */}
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">

            <h2 className="text-base font-semibold text-gray-800 truncate">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.desc}
            </p>

          </div>

          {/* Edit Button */}
          <button
            onClick={() => {
              nav(`/edit?title=${item.title}&desc=${item.desc}&priority=${item.priority}&status=${item.status}&id=${item._id}`)
            }}
            className="
              shrink-0
              p-2
              rounded-lg
              text-gray-400
              hover:text-blue-600
              hover:bg-blue-50
              transition-colors
            "
            title="Edit task"
          >
            ✏️
          </button>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-4">

          <span
            className={`
              px-3 py-1
              rounded-full
              text-xs
              font-medium
              capitalize
              ${priorityStyles[item.priority]}
            `}
          >
            {item.priority}
          </span>

          <span className="text-xs text-gray-400">
            Drag to move
          </span>

        </div>

      </article>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>


        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ================= PENDING ================= */}
          <section className="
            bg-gray-50
            rounded-xl
            border border-gray-200
            overflow-hidden
          ">

            <div className="
              px-5 py-4
              border-b border-gray-200
              bg-yellow-50
            ">
              <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-yellow-700">
                  Pending
                </h2>

                <span className="
                  px-2.5 py-1
                  rounded-full
                  bg-yellow-100
                  text-yellow-700
                  text-xs
                  font-semibold
                ">
                  {data.filter(item => item.status === "pending").length}
                </span>

              </div>
            </div>






            <div 
              ref={pendingRef}
               onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                const id = e.dataTransfer.getData("yedraghorhahai")
                pendingRef.current.append(document.getElementById(id))

                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "pending"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              }}
              className="
              p-5
              space-y-4
              h-[65vh]
              overflow-y-auto
              scrollbar-none
            ">











              {data.map((item) => {

                if (item.status != "pending") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>


          {/* ================= IN PROGRESS ================= */}
          <section className="
            bg-gray-50
            rounded-xl
            border border-gray-200
            overflow-hidden
          ">

            <div className="
              px-5 py-4
              border-b border-gray-200
              bg-blue-50
            ">
              <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-blue-700">
                  In Progress
                </h2>

                <span className="
                  px-2.5 py-1
                  rounded-full
                  bg-blue-100
                  text-blue-700
                  text-xs
                  font-semibold
                ">
                  {data.filter(item => item.status === "working").length}
                </span>

              </div>
            </div>















            <div 
            ref={workingRef}
              onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                const id = e.dataTransfer.getData("yedraghorhahai")
                workingRef.current.append(document.getElementById(id))
             
                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "working"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              }}
              className="
              p-5
              space-y-4
              h-[65vh]
              overflow-y-auto
              scrollbar-none
            ">










              {data.map((item) => {

                if (item.status != "working") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>


          {/* ================= COMPLETED ================= */}
          <section className="
            bg-gray-50
            rounded-xl
            border border-gray-200
            overflow-hidden
          ">

            <div className="
              px-5 py-4
              border-b border-gray-200
              bg-green-50
            ">
              <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-green-700">
                  Completed
                </h2>

                <span className="
                  px-2.5 py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-xs
                  font-semibold
                ">
                  {data.filter(item => item.status === "completed").length}
                </span>

              </div>
            </div>









            <div 
              ref={completedRef}
               onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                // completedRef.current.append(document.getElementById(e.dataTransfer.getData("yedraghorhahai")))
              
               const id = e.dataTransfer.getData("yedraghorhahai")
                completedRef.current.append(document.getElementById(id))
             
                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "completed"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              
              }}
              className="
              p-5
              space-y-4
              h-[65vh]
              overflow-y-auto
              scrollbar-none
            ">









              {data.map((item) => {

                if (item.status != "completed") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>

        </div>

      </div>

    </div>
  )
}

export default Home