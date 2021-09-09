class Api::V1::LeaveAccrualSettingsController < ApiController
  def index

    @leave_accrual_settings= LeaveAccrualSetting.all
 
    render json: @leave_accrual_settings

  end

  def show
    set_leave_accrual_settings()

    render json: @leave_accrual_setting
  end

  def create
    @leave_accrual_setting = LeaveAccrualSetting.new(leave_accrual_settings_params)
   
    if @leave_accrual_setting.save
      render json: @leave_accrual_setting
    else
      render json: @leave_accrual_setting.errors
    end
  end

  def destroy
    set_leave_accrual_settings()
    @leave_accrual_setting.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_accrual_settings()
    if @leave_accrual_setting.update(leave_accrual_settings_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leave_accrual_setting.errors
    end
  
  end

  private 

  def set_leave_accrual_settings
    @leave_accrual_setting = LeaveAccrualSetting.find(params[:id])
  end

  def leave_accrual_settings_params
    params.permit(:id, :employeeid, :leave_accrual_setting, :isregular ,:rate, :year, :isyearly, :active, :leavetypeid)
  end
end
