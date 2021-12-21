import styles from "styles/common/ForgotPassword.module.scss"
function ForgotPassword() {

    return (
        <div className={styles.container}>
            <div></div>
            <div class="text-white">
                <div class="text-center">
                    <div class="display-8">Court Booking System </div>
                </div>
            </div>
            <div class="container">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div class="col-lg-7">
                                <div class="p-5">

                                    <div class="text-center">
                                        <div class="h4 text-gray-900 mb-4"> Welcome back !</div>
                                    </div>


                                    <form >

                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user" id="" placeholder="Username">

                                            </input>

                                        </div>

                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" id=""
                                                placeholder="Password" />
                                        </div>
                                        <a href="login.html" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default ForgotPassword 