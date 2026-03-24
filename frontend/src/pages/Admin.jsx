import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { statsService, orderService } from '../utils/api'
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react'

function Admin() {
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await orderService.getAll()
        setOrders(ordersRes.data || [])
        setStats({
          totalOrders: ordersRes.data?.length || 0,
          totalRevenue: ordersRes.data?.reduce((sum, order) => sum + order.total, 0) || 0,
          totalCustomers: new Set(ordersRes.data?.map(order => order.customer?.email)).size,
          avgOrderValue: ordersRes.data?.length > 0 ? (ordersRes.data?.reduce((sum, order) => sum + order.total, 0) / ordersRes.data?.length) : 0
        })
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const StatCard = ({ icon: Icon, label, value }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-primary-900 mt-2">{value}</p>
        </div>
        <Icon size={48} className="text-warm opacity-20" />
      </div>
    </motion.div>
  )

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-900 mb-12">Tableau de Bord Admin</h1>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={Package}
              label="Commandes Totales"
              value={stats.totalOrders}
            />
            <StatCard
              icon={DollarSign}
              label="Revenu Total"
              value={`${stats.totalRevenue.toFixed(2)} DH`}
            />
            <StatCard
              icon={Users}
              label="Clients Uniques"
              value={stats.totalCustomers}
            />
            <StatCard
              icon={TrendingUp}
              label="Commande Moyenne"
              value={`${stats.avgOrderValue.toFixed(2)} DH`}
            />
          </div>
        )}

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-primary-200">
            <h2 className="text-2xl font-bold text-primary-900">Commandes Récentes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-50 border-b border-primary-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-primary-900">Client</th>
                  <th className="text-left px-6 py-4 font-semibold text-primary-900">Email</th>
                  <th className="text-left px-6 py-4 font-semibold text-primary-900">Montant</th>
                  <th className="text-left px-6 py-4 font-semibold text-primary-900">Statut</th>
                  <th className="text-left px-6 py-4 font-semibold text-primary-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-primary-100 hover:bg-primary-50 transition">
                    <td className="px-6 py-4 text-primary-900 font-medium">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.customer?.email}</td>
                    <td className="px-6 py-4 font-bold text-primary-900">{order.total?.toFixed(2)} DH</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Aucune commande pour le moment
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
