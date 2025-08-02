import '@/styles/welcome.css'
import Image from 'next/image'
import img from '@/public/star.png'
import Link from 'next/link'

const Welcome = () => {
  return (
    <>
      <div className="welcome">
        <div className="image">
          <Image src={img} alt="Logo" width={130} height={130} />
        </div>
        <div className="heading">
          <h1>EVENT PLANNING CHECKLIST</h1>
          <h3>
            Plan and execute the perfect event with a comprehensive checklist
            system. Stay organized and never miss a detail.
          </h3>
        </div>
        <div className="button">
          <Link href="/events">
            <button>Get Started</button>
          </Link>
        </div>
      </div>

      <div className="box">
        <div className="box1">
          <Image
            src="https://img.icons8.com/fluency/48/calendar--v1.png"
            alt="calendar"
            width={48}
            height={48}
          />
          <h2>Comprehensive Planning</h2>
          <p>
            Organize every aspect of your event with our detailed checklist
            categories
          </p>
        </div>

        <div className="box2">
          <Image
            src="https://img.icons8.com/fluency/48/todo-list--v1.png"
            alt="todo list"
            width={48}
            height={48}
          />
          <h2>Progress Tracking</h2>
          <p>Visual progress bars help you stay on track and meet deadlines</p>
        </div>

        <div className="box3">
          <Image
            src="https://img.icons8.com/ultraviolet/40/collaboration.png"
            alt="collaboration"
            width={40}
            height={40}
          />
          <h2>Collaboration</h2>
          <p>Share your checklist with team members and clients</p>
        </div>
      </div>

      <div className="ready">
        <h4>Ready to plan your Event?</h4>
        <Link href="/events">
          <button>Get Started Now</button>
        </Link>
      </div>

      <p>Built for event organizers who want to create memorable experiences</p>
    </>
  )
}

export default Welcome
