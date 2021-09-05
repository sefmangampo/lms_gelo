class Api::V1::PaymentModeController < ApiController
  def index

    @payment_modes= PaymentMode.all
 
    render json: @payment_modes

  end

  def show
    set_payment_mode()

    render json: @payment_mode
  end

  def create
    @payment_mode = PaymentMode.new(payment_mode_params)
   
    if @payment_mode.save
      render json: @payment_mode
    else
      render json: @payment_mode.errors
    end
  end

  def destroy
    set_payment_mode()
    @payment_mode.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_payment_mode()
    if @payment_mode.update(payment_mode_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @payment_mode.errors
    end
  
  end

  private 

  def set_payment_mode
    @payment_mode = PaymentMode.find(params[:id])
  end

  def payment_mode_params
    params.permit(:id, :name, :useincutoffs ,:active)
  end
end
