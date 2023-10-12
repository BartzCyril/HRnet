import {Form} from "../components/Form/Form.tsx";
import {Header} from "../components/Header.tsx";

export function App() {

  return (
      <>
          <Header/>
          <section className="container mx-auto">
              <h1 className="text-center">Create Employee</h1>
              <Form/>
          </section>
      </>
  )
}


