class Api::V1::AppointmentsController < ApiController
  def index
     
    @appointments = Appointment.all
 
    render json: @appointments
  end

  def show
    set_appointment()

    render json: @appointment
  end

  def create
    @appointment = Appointment.new(appointment_params)
   
    if @appointment.save
      render json: {id: @appointment.id}
    else
      render json: @appointment.errors
    end
  end

  def destroy
    set_appointment()
    @appointment.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_appointment()
    if @appointment.update(appointment_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @appointment.errors
    end
  
  end

  private 

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

  def appointment_params
    params.permit(:id, :text, :startDate, :endDate, :allday, :description, :recurrenceRule, :iseditable, :isusermade, :type)
  end
  
end
