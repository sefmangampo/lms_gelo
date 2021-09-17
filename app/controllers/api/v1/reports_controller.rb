class Api::V1::ReportsController < ApiController
  def generate

    year = Date.current.year if params[:year].blank?   
    
    paygroupid = params[:paygroupid].to_i
    startdate = params[:startdate].to_s
    enddate = params[:enddate].to_s
    nameofreport = params[:nameofreport]
    issavereport = params[:issavereport]

   
    res = ActiveRecord::Base.connection.exec_query("call sp_leave_credits(#{paygroupid},'#{startdate}','#{enddate}','#{nameofreport}',#{issavereport})")

    render json: res
  end
end
